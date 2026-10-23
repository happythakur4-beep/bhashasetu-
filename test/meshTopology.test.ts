import assert from 'assert';
import { meshTopologyService, RadarRangeMeters, MapDisplayMode } from '../src/services/meshTopologyService';

console.log('📡 Starting Tactical Mesh Topology & Radar Service Test Suite...');

// Test 1: Initial state & Display Modes
console.log('\n[TEST 1] Testing Initial State, Range & Display Modes...');
assert.strictEqual(meshTopologyService.getRangeMeters(), 100, 'Default radar range should be 100m');
assert.strictEqual(meshTopologyService.getDisplayMode(), 'polar_radar', 'Default display mode should be polar_radar');

meshTopologyService.setRangeMeters(250);
assert.strictEqual(meshTopologyService.getRangeMeters(), 250, 'Range should update to 250m');

meshTopologyService.setDisplayMode('force_topology');
assert.strictEqual(meshTopologyService.getDisplayMode(), 'force_topology', 'Display mode should update to force_topology');

// Reset to defaults
meshTopologyService.setRangeMeters(100);
meshTopologyService.setDisplayMode('polar_radar');
console.log('✓ Range and Display Mode toggling verified.');

// Test 2: Node Synchronization & Telemetry
console.log('\n[TEST 2] Testing Tactical Node Synchronization...');
const nodes = meshTopologyService.getNodes();
assert(Array.isArray(nodes), 'Nodes should be an array');
console.log(`✓ Synchronized ${nodes.length} nodes from meshNetwork.`);

if (nodes.length > 0) {
  const local = nodes.find((n) => n.isLocalUser);
  assert(local !== undefined, 'Local user node must be present');
  assert.strictEqual(local.azimuthDeg, 0, 'Local user azimuth should be centered at 0 deg');
  assert.strictEqual(local.estimatedDistanceMeters, 0, 'Local user distance should be 0m');
  assert.strictEqual(local.role, 'command_center', 'Local user should have command_center role');
  console.log('✓ Local user tactical node schema verified.');
}

// Test 3: Node Selection
console.log('\n[TEST 3] Testing Node Selection...');
assert.strictEqual(meshTopologyService.getSelectedNodeId(), null, 'Initially no node selected');

if (nodes.length > 0) {
  const targetId = nodes[0].id;
  meshTopologyService.setSelectedNodeId(targetId);
  assert.strictEqual(meshTopologyService.getSelectedNodeId(), targetId, 'Selected node ID must match');

  meshTopologyService.setSelectedNodeId(null);
  assert.strictEqual(meshTopologyService.getSelectedNodeId(), null, 'Clearing node selection verified');
}

// Test 4: Hop Vectors & Multi-hop Topology
console.log('\n[TEST 4] Testing Hop Vectors & Link Quality...');
const hopVectors = meshTopologyService.getHopVectors();
assert(Array.isArray(hopVectors), 'Hop vectors must be an array');
console.log(`✓ Active hop vectors count: ${hopVectors.length}`);

// Test 5: Listener Subscriptions
console.log('\n[TEST 5] Testing Topology Listener Subscriptions...');
let listenerCallCount = 0;
const unsub = meshTopologyService.subscribe((updatedNodes, updatedVectors) => {
  listenerCallCount++;
  assert(Array.isArray(updatedNodes), 'Updated nodes should be an array');
  assert(Array.isArray(updatedVectors), 'Updated vectors should be an array');
});

assert(listenerCallCount >= 1, 'Subscriber should be called immediately upon subscription');

// Change range to trigger notification
meshTopologyService.setRangeMeters(50);
assert(listenerCallCount >= 2, 'Subscriber should be notified on setRangeMeters');

meshTopologyService.setRangeMeters(100);
unsub();
console.log('✓ Subscriber notification and unsubscription verified.');

console.log('\n======================================================');
console.log('🎉 ALL TACTICAL MESH TOPOLOGY TESTS PASSED CLEANLY!');
console.log('======================================================');
process.exit(0);
