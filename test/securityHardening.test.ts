import assert from 'assert';
import http from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { RoomRelayService } from '../src/server/roomRelay';

console.log('🛡️ Starting Security Hardening & Vulnerability Verification Test Suite...');

// ============================================================================
// 1. Test Room Code & Client ID Input Sanitization
// ============================================================================
console.log('\n[TEST 1] Testing Room Code & Client ID Sanitization...');

const server = http.createServer();
const roomsWss = new WebSocketServer({ noServer: true });
const relay = new RoomRelayService();

server.on('upgrade', (request, socket, head) => {
  const url = new URL(request.url || '', `http://${request.headers.host || 'localhost'}`);
  if (url.pathname === '/rooms') {
    roomsWss.handleUpgrade(request, socket, head, (ws) => {
      relay.handleConnection(ws);
    });
  } else {
    socket.destroy();
  }
});

async function runSecurityTests() {
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address() as any;
  const port = address.port;

  // A. Reject malformed room codes (e.g. script injection or control chars)
  const ws1 = new WebSocket(`ws://localhost:${port}/rooms`);
  await new Promise((res) => ws1.on('open', res));

  let receivedError: any = null;
  ws1.on('message', (raw) => {
    const data = JSON.parse(raw.toString());
    if (data.type === 'error') {
      receivedError = data;
    }
  });

  // Attempt invalid room code with script tags
  ws1.send(
    JSON.stringify({
      type: 'join_room',
      roomCode: '<script>alert(1)</script>',
      clientId: 'client_alpha',
    })
  );

  await new Promise((res) => setTimeout(res, 80));
  assert(receivedError !== null, 'Server must reject non-alphanumeric room codes');
  assert.strictEqual(receivedError.code, 'INVALID_FORMAT', 'Error code must be INVALID_FORMAT');
  console.log('✓ Malicious script injection in roomCode safely rejected with INVALID_FORMAT.');
  ws1.close();

  // ============================================================================
  // 2. Test Packet Transmission Rate Limiting (Anti-Spam / Anti-DoS)
  // ============================================================================
  console.log('\n[TEST 2] Testing Packet Flood & DoS Rate Limiting...');

  const ws2 = new WebSocket(`ws://localhost:${port}/rooms`);
  await new Promise((res) => ws2.on('open', res));

  ws2.send(
    JSON.stringify({
      type: 'join_room',
      roomCode: 'secure_room_77',
      clientId: 'valid_client_1',
    })
  );
  await new Promise((res) => setTimeout(res, 80));

  let rateLimitHit = false as boolean;
  ws2.on('message', (raw) => {
    const data = JSON.parse(raw.toString());
    if (data.type === 'error' && data.code === 'RATE_LIMIT_EXCEEDED') {
      rateLimitHit = true;
    }
  });

  // Blast 45 packets rapidly in a single loop
  for (let i = 0; i < 45; i++) {
    ws2.send(
      JSON.stringify({
        type: 'packet',
        packet: {
          id: `flood_pkt_${i}`,
          originalText: `Spam packet ${i}`,
        },
      })
    );
  }

  await new Promise((res) => setTimeout(res, 120));
  assert.ok(rateLimitHit, 'Server must trigger RATE_LIMIT_EXCEEDED when client spams packets');
  console.log('✓ High-frequency packet flood detected and throttled (RATE_LIMIT_EXCEEDED).');
  ws2.close();

  // ============================================================================
  // 3. Test Audio Payload Bounded Limits (Max 2.5MB)
  // ============================================================================
  console.log('\n[TEST 3] Testing Audio Payload Maximum Bounds (2.5MB cap)...');

  const ws3 = new WebSocket(`ws://localhost:${port}/rooms`);
  await new Promise((res) => ws3.on('open', res));

  ws3.send(
    JSON.stringify({
      type: 'join_room',
      roomCode: 'secure_room_88',
      clientId: 'valid_client_2',
    })
  );
  await new Promise((res) => setTimeout(res, 80));

  let payloadTooLargeHit = false as boolean;
  ws3.on('message', (raw) => {
    const data = JSON.parse(raw.toString());
    if (data.type === 'error' && data.code === 'PAYLOAD_TOO_LARGE') {
      payloadTooLargeHit = true;
    }
  });

  // Attempt 3MB audio base64 payload on a fresh socket
  const hugeAudio = 'A'.repeat(3 * 1024 * 1024);
  ws3.send(
    JSON.stringify({
      type: 'packet',
      packet: {
        id: 'oversized_audio_pkt',
        audioBase64: hugeAudio,
      },
    })
  );

  await new Promise((res) => setTimeout(res, 150));
  assert.ok(payloadTooLargeHit, 'Server must reject payloads exceeding 2.5MB');
  console.log('✓ Oversized 3MB audio payload safely rejected with PAYLOAD_TOO_LARGE.');

  ws3.close();
  server.close();

  console.log('\n======================================================');
  console.log('🎉 ALL SECURITY HARDENING TESTS PASSED CLEANLY!');
  console.log('======================================================');
  process.exit(0);
}

runSecurityTests().catch((err) => {
  console.error('Security test failed:', err);
  process.exit(1);
});
