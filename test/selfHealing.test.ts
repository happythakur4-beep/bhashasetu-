/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { selfHealingEngine } from '../src/services/selfHealingEngine';

console.log('⚡ Starting Autonomous Self-Healing Engine Test Suite...\n');

async function runTests() {
  // Test 1: Check initial watchdog configuration
  console.log('[TEST 1] Verifying Watchdog & Subsystem Definitions...');
  const isEnabled = selfHealingEngine.isAutoHealingEnabled();
  if (typeof isEnabled !== 'boolean') {
    throw new Error('isAutoHealingEnabled() should return boolean');
  }
  console.log('✓ Watchdog status:', isEnabled ? 'ACTIVE' : 'OFF');

  const subsystems = selfHealingEngine.getSubsystems();
  const requiredSubsystems = ['audio_engine', 'microphone', 'ai_gemini', 'websocket_mesh', 'storage_cache'];
  for (const sub of requiredSubsystems) {
    if (!subsystems[sub as keyof typeof subsystems]) {
      throw new Error(`Missing required subsystem: ${sub}`);
    }
  }
  console.log('✓ All 5 core subsystems registered with health metadata:');
  Object.values(subsystems).forEach((s) => console.log(`  - [${s.status.toUpperCase()}] ${s.name} (${s.hindiName})`));

  // Test 2: Incident Event Subscription
  console.log('\n[TEST 2] Testing Heal Event Subscription & Dispatch...');
  let eventDispatched = false;
  const unsub = selfHealingEngine.onHealIncident((incident) => {
    eventDispatched = true;
    console.log(`✓ Received heal incident event: "${incident.hindiTitle}" [${incident.status.toUpperCase()}]`);
  });

  // Test 3: Audio Subsystem Healing
  console.log('\n[TEST 3] Testing Audio Pipeline Self-Healing...');
  await selfHealingEngine.healAudioEngine('Simulated Autoplay restriction lock');

  // Test 4: Gemini AI Rate-Limit / Quota 429 Fallback Healing
  console.log('\n[TEST 4] Testing Gemini AI Quota 429 Fallback Self-Healing...');
  await selfHealingEngine.healGeminiAI('Simulated Gemini 429 Rate-Limit Quota Exceeded');

  // Test 5: Storage Quota & Optimization Healing
  console.log('\n[TEST 5] Testing Storage & Cache Optimization Healing...');
  await selfHealingEngine.healStorageCache('Simulated Cache Bloat Over 50 items');

  // Test 6: Full 5-Step System Auto-Repair Execution
  console.log('\n[TEST 6] Testing Master Full 5-Step System Auto-Repair...');
  const report = await selfHealingEngine.triggerFullAutoRepair();
  console.log('✓ Full Auto-Repair Report:', report.summaryHindi);
  console.log('✓ Subsystem status results:', report.results);

  // Test 7: Verify Incident History Logging
  console.log('\n[TEST 7] Verifying Incident History Retention...');
  const history = selfHealingEngine.getIncidentHistory();
  if (history.length === 0) {
    throw new Error('Incident history should record recent heal actions');
  }
  console.log(`✓ Recorded ${history.length} self-healing incidents in audit trail.`);

  unsub();
  console.log('\n======================================================');
  console.log('🎉 ALL AUTONOMOUS SELF-HEALING TESTS PASSED CLEANLY!');
  console.log('======================================================');
}

runTests().catch((err) => {
  console.error('❌ Self-Healing test failed:', err);
  process.exit(1);
});
