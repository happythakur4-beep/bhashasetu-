import assert from 'assert';
import { opusCodec, OPUS_BITRATE_PRESETS } from '../src/services/opusCodec';

console.log('🎙️ Starting Opus Codec & Compression Engine Test Suite...');

// Test 1: Bitrate Presets
console.log('\n[TEST 1] Testing Opus Bitrate Presets...');
assert(Array.isArray(OPUS_BITRATE_PRESETS), 'Presets should be an array');
assert(OPUS_BITRATE_PRESETS.length >= 5, 'Should have at least 5 standard presets');

const bitrates = OPUS_BITRATE_PRESETS.map((p) => p.bitrateKbps);
assert(bitrates.includes(6), 'Should support 6 kbps emergency mode');
assert(bitrates.includes(16), 'Should support 16 kbps recommended tactical mode');
assert(bitrates.includes(32), 'Should support 32 kbps broadcast mode');
console.log('✓ All standard Opus bitrate presets verified:', bitrates);

// Test 2: Configuration & Subscription
console.log('\n[TEST 2] Testing Configuration & Subscription Updates...');
const initialConfig = opusCodec.getConfig();
assert(typeof initialConfig.bitrateKbps === 'number', 'Initial bitrate should be a number');

let notifiedConfig = null;
const unsub = opusCodec.subscribe((updated) => {
  notifiedConfig = updated;
});

opusCodec.updateConfig({ bitrateKbps: 24, vbr: true });
const updated = opusCodec.getConfig();
assert.strictEqual(updated.bitrateKbps, 24, 'Bitrate should update to 24 kbps');
assert.strictEqual(updated.vbr, true, 'VBR should be true');
assert(notifiedConfig !== null, 'Subscriber must be notified on update');
unsub();
console.log('✓ Config update and listener notification verified.');

// Test 3: Base64 Byte Size Calculation
console.log('\n[TEST 3] Testing Base64 Payload Byte Sizing...');
// 100 bytes of dummy base64
const testPayload = 'data:audio/wav;base64,' + Buffer.from('HelloWorld'.repeat(10)).toString('base64');
const byteSize = opusCodec.calculateBase64Size(testPayload);
assert.strictEqual(byteSize, 100, 'Calculated byte size should exactly equal 100 bytes');
console.log('✓ Base64 byte size calculation accurate.');

// Test 4: Compression Simulation & Savings
console.log('\n[TEST 4] Testing Compression Simulation & Savings...');
// Generate 10KB dummy audio payload
const largeAudioData = 'data:audio/wav;base64,' + Buffer.alloc(10000, 1).toString('base64');

async function testCompression() {
  const result = await opusCodec.compressAudioPayload(largeAudioData, { bitrateKbps: 16 });
  assert(result.stats.compressedSizeBytes < result.stats.originalSizeBytes, 'Compressed size should be smaller than original');
  assert(result.stats.savingsPercent > 50, `Savings should be > 50%, got ${result.stats.savingsPercent}%`);
  assert.strictEqual(result.header.magic, 'OpusHead', 'Opus packet header magic must be OpusHead');
  assert.strictEqual(result.header.outputBitrateKbps, 16, 'Header bitrate must reflect config');
  console.log(`✓ Compression achieved ${result.stats.savingsPercent}% savings (${result.stats.originalSizeBytes}B -> ${result.stats.compressedSizeBytes}B).`);
}

testCompression().then(() => {
  // Test 5: Disabled Compression Passthrough
  console.log('\n[TEST 5] Testing Disabled Compression Passthrough...');
  opusCodec.compressAudioPayload(largeAudioData, { enabled: false }).then((disabledResult) => {
    assert.strictEqual(disabledResult.stats.savingsPercent, 0, 'Disabled compression should yield 0% savings');
    assert.strictEqual(disabledResult.stats.compressedSizeBytes, disabledResult.stats.originalSizeBytes, 'Sizes should match when disabled');
    console.log('✓ Passthrough verified when compression is disabled.');

    // Reset config back to default
    opusCodec.updateConfig(initialConfig);

    console.log('\n======================================================');
    console.log('🎉 ALL OPUS CODEC TESTS PASSED CLEANLY!');
    console.log('======================================================');
    process.exit(0);
  });
}).catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
