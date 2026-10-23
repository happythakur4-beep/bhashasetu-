/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { detectLanguage, SUPPORTED_LANGUAGES, getLanguageConfig, findInOfflinePhrasebook } from '../src/services/languageRegistry';
import { getHonestOfflineTranslation, langNames } from '../src/server/offlineTranslation';

console.log('🌐 Starting Language Auto-Detection & Odia for Urmila Rename Test Suite...\n');

async function runTests() {
  // Test 1: Verify Odia is renamed to "Odia for Urmila"
  console.log('[TEST 1] Verifying Odia rename to "Odia for Urmila"...');
  const odiaConfig = getLanguageConfig('or');
  if (odiaConfig.name !== 'Odia for Urmila') {
    throw new Error(`Expected Odia config name to be "Odia for Urmila", got "${odiaConfig.name}"`);
  }
  if (!odiaConfig.nativeName.includes('ओडिया फॉर उर्मिला')) {
    throw new Error(`Expected nativeName to include "ओडिया फॉर उर्मिला", got "${odiaConfig.nativeName}"`);
  }
  if (!langNames['or'].includes('Odia for Urmila')) {
    throw new Error(`Expected server langNames['or'] to include "Odia for Urmila", got "${langNames['or']}"`);
  }
  console.log(`✓ Odia correctly renamed: "${odiaConfig.name}" (${odiaConfig.nativeName})`);

  // Test 2: Verify "Auto-Detect" is registered in SUPPORTED_LANGUAGES
  console.log('\n[TEST 2] Verifying "Auto-Detect" in language registry...');
  const autoConfig = SUPPORTED_LANGUAGES.find((l) => l.code === 'auto');
  if (!autoConfig) {
    throw new Error('Auto-Detect ("auto") not found in SUPPORTED_LANGUAGES');
  }
  console.log(`✓ Auto-Detect registered at index 0: "${autoConfig.name}" (${autoConfig.nativeName})`);

  // Test 3: Language Auto-Detection for Odia for Urmila
  console.log('\n[TEST 3] Testing Auto-Detection for Odia for Urmila (Unicode \\u0B00-\\u0B7F)...');
  const odiaText = 'ନମସ୍କାର, ଆପଣ କେମିତି ଅଛନ୍ତି?';
  const detectedOdia = detectLanguage(odiaText);
  if (detectedOdia !== 'or') {
    throw new Error(`Expected 'or' for Odia text, got '${detectedOdia}'`);
  }
  console.log(`✓ Detected Odia for Urmila ('or') correctly for: "${odiaText}"`);

  // Test 4: Language Auto-Detection for Mandali Pahadi
  console.log('\n[TEST 4] Testing Auto-Detection for Mandali / Mandyali Pahadi dialect tokens...');
  const mandaliText = 'तुसां कुथु जांदे?';
  const detectedMandali = detectLanguage(mandaliText);
  if (detectedMandali !== 'mjl') {
    throw new Error(`Expected 'mjl' for Mandali text, got '${detectedMandali}'`);
  }
  console.log(`✓ Detected Mandali Pahadi ('mjl') correctly for: "${mandaliText}"`);

  // Test 5: Language Auto-Detection for Standard Hindi
  console.log('\n[TEST 5] Testing Auto-Detection for Standard Hindi...');
  const hindiText = 'नमस्ते, आप कैसे हैं?';
  const detectedHindi = detectLanguage(hindiText);
  if (detectedHindi !== 'hi') {
    throw new Error(`Expected 'hi' for Hindi text, got '${detectedHindi}'`);
  }
  console.log(`✓ Detected Hindi ('hi') correctly for: "${hindiText}"`);

  // Test 6: Language Auto-Detection for Punjabi (Gurmukhi)
  console.log('\n[TEST 6] Testing Auto-Detection for Punjabi (Gurmukhi)...');
  const punjabiText = 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ, ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?';
  const detectedPunjabi = detectLanguage(punjabiText);
  if (detectedPunjabi !== 'pa') {
    throw new Error(`Expected 'pa' for Punjabi text, got '${detectedPunjabi}'`);
  }
  console.log(`✓ Detected Punjabi ('pa') correctly for: "${punjabiText}"`);

  // Test 7: Language Auto-Detection for English
  console.log('\n[TEST 7] Testing Auto-Detection for English...');
  const englishText = 'Hello, where are you traveling from?';
  const detectedEnglish = detectLanguage(englishText);
  if (detectedEnglish !== 'en') {
    throw new Error(`Expected 'en' for English text, got '${detectedEnglish}'`);
  }
  console.log(`✓ Detected English ('en') correctly for: "${englishText}"`);

  // Test 8: End-to-end Translation with sourceLang: 'auto'
  console.log('\n[TEST 8] Testing getHonestOfflineTranslation with sourceLang: "auto"...');
  // Speak Mandali phrase, target is Hindi
  const autoResult = getHonestOfflineTranslation('मां जो झटपट डाक्टरी मदद चहिदी! डाक्टरा जो सदो।', 'auto', 'hi');
  if (!autoResult.success || !autoResult.data) {
    throw new Error(`Auto-detect translation failed: ${autoResult.error}`);
  }
  console.log(`✓ Spoke Mandali with sourceLang 'auto' -> Detected: "${autoResult.data.detectedSource}", Output: "${autoResult.data.translatedText}"`);
  if (autoResult.data.detectedSource !== 'mjl') {
    throw new Error(`Expected detectedSource 'mjl', got '${autoResult.data.detectedSource}'`);
  }

  // Speak Odia phrase, target is Hindi
  const autoOdiaResult = getHonestOfflineTranslation('ମୋତେ ତୁରନ୍ତ ଡାକ୍ତରୀ ସାହାଯ୍ୟ ଦରକାର! ଡାକ୍ତରଙ୍କୁ ଡାକନ୍ତୁ।', 'auto', 'hi');
  if (!autoOdiaResult.success || !autoOdiaResult.data) {
    throw new Error(`Auto-detect translation from Odia failed: ${autoOdiaResult.error}`);
  }
  console.log(`✓ Spoke Odia for Urmila with sourceLang 'auto' -> Detected: "${autoOdiaResult.data.detectedSource}", Output: "${autoOdiaResult.data.translatedText}"`);
  if (autoOdiaResult.data.detectedSource !== 'or') {
    throw new Error(`Expected detectedSource 'or', got '${autoOdiaResult.data.detectedSource}'`);
  }

  console.log('\n========================================================================');
  console.log('🎉 ALL AUTO-DETECTION & ODIA FOR URMILA RENAME TESTS PASSED CLEANLY!');
  console.log('========================================================================');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
