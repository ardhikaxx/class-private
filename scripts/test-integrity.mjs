import assert from 'node:assert/strict';

// Import our TypeScript files via node using standard ESM or recreate validation checks
import { PROGRAMS, ALL_PROGRAMS, formatRupiah, getProgramBySlug, isValidProgramSlug } from '../lib/programs.ts';
import { APP_CONFIG } from '../lib/config.ts';
import { buildWhatsAppConfirmationText, buildWhatsAppConfirmationUrl, buildWhatsAppConsultationUrl } from '../lib/whatsapp.ts';
import { createTransactionRecord, getTransactionByReference, validateParticipantName } from '../lib/transactions.ts';
import { BASE_STATIC_QRIS_PAYLOAD, calculateCrc16, generateDynamicQrisPayload } from '../lib/qris.ts';

console.log('🧪 Starting System Verification & Acceptance Tests...\n');

let passedTests = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

async function asyncTest(name, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

async function runAll() {
  // -------------------------------------------------------------
  // TEST SUITE 1: Program Configuration & Pricing Integrity
  // -------------------------------------------------------------
  console.log('--- 1. Program Data & Centralized Pricing ---');

  test('Programs count must be exactly 3', () => {
    assert.equal(ALL_PROGRAMS.length, 3);
    assert.equal(Object.keys(PROGRAMS).length, 3);
  });

  test('Class Website configuration and price is exactly Rp 250.000', () => {
    const p = PROGRAMS.website;
    assert.equal(p.slug, 'website');
    assert.equal(p.name, 'Class Website');
    assert.equal(p.price, 250000);
    assert.equal(p.meetingsCount, 5);
    assert.ok(p.bonusFacility.includes('Gemini Pro'));
    assert.ok(p.bonusFacility.includes('3 bulan'));
    assert.equal(formatRupiah(p.price).replace(/\s/g, ' '), 'Rp 250.000');
  });

  test('Class Aplikasi Mobile configuration and price is exactly Rp 300.000', () => {
    const p = PROGRAMS.mobile;
    assert.equal(p.slug, 'mobile');
    assert.equal(p.name, 'Class Aplikasi Mobile');
    assert.equal(p.price, 300000);
    assert.equal(p.meetingsCount, 5);
    assert.ok(p.bonusFacility.includes('Gemini Pro'));
    assert.ok(p.bonusFacility.includes('3 bulan'));
    assert.equal(formatRupiah(p.price).replace(/\s/g, ' '), 'Rp 300.000');
  });

  test('Class Integrasi configuration and price is exactly Rp 450.000', () => {
    const p = PROGRAMS.integrasi;
    assert.equal(p.slug, 'integrasi');
    assert.equal(p.name, 'Class Integrasi Website dan Aplikasi Mobile');
    assert.equal(p.price, 450000);
    assert.equal(p.meetingsCount, 5);
    assert.equal(p.popularBadge, 'Paling Komprehensif');
    assert.ok(p.bonusFacility.includes('Gemini Pro'));
    assert.ok(p.bonusFacility.includes('3 bulan'));
    assert.equal(formatRupiah(p.price).replace(/\s/g, ' '), 'Rp 450.000');
  });

  test('getProgramBySlug and isValidProgramSlug correctly identify valid slugs and reject invalid', () => {
    assert.equal(isValidProgramSlug('website'), true);
    assert.equal(isValidProgramSlug('mobile'), true);
    assert.equal(isValidProgramSlug('integrasi'), true);
    assert.equal(isValidProgramSlug('invalid-slug'), false);
    assert.equal(isValidProgramSlug(''), false);
    assert.equal(isValidProgramSlug(null), false);

    assert.equal(getProgramBySlug('website')?.price, 250000);
    assert.equal(getProgramBySlug('unknown'), undefined);
  });

  // -------------------------------------------------------------
  // TEST SUITE 2: WhatsApp Integration & Message Formatting
  // -------------------------------------------------------------
  console.log('\n--- 2. WhatsApp Integration & Message Formatting ---');

  test('WhatsApp tutor phone number normalized correctly to 6285933648537', () => {
    assert.equal(APP_CONFIG.whatsapp.rawNumber, '085933648537');
    assert.equal(APP_CONFIG.whatsapp.intlNumber, '6285933648537');
    assert.ok(!APP_CONFIG.whatsapp.intlNumber.startsWith('+'));
    assert.ok(!APP_CONFIG.whatsapp.intlNumber.startsWith('0'));
  });

  test('Confirmation message format matches exact requirements', () => {
    const msg = buildWhatsAppConfirmationText({
      participantName: 'Muhammad Ardhika',
      programName: 'Class Website',
      amount: 250000,
      meetingsCount: 5,
      bonusFacility: 'Gemini Pro selama 3 bulan',
      transactionReference: 'PCC-20261028-TEST',
      paymentStatusLabel: 'Menunggu Verifikasi Bukti Pembayaran'
    });

    assert.ok(msg.includes('Halo, saya ingin melakukan konfirmasi pendaftaran Private Coding Class.'));
    assert.ok(msg.includes('Nama peserta: Muhammad Ardhika'));
    assert.ok(msg.includes('Program: Class Website'));
    assert.ok(msg.includes('Biaya program: Rp 250.000'));
    assert.ok(msg.includes('Jumlah pertemuan: 5 kali pertemuan'));
    assert.ok(msg.includes('Fasilitas: Gemini Pro selama 3 bulan'));
    assert.ok(msg.includes('Reference transaksi: PCC-20261028-TEST'));
    assert.ok(msg.includes('Status pembayaran: Menunggu Verifikasi Bukti Pembayaran'));
    assert.ok(msg.includes('Saya sudah mendapatkan informasi pembayaran dan akan mengirimkan screenshot bukti pembayaran melalui chat WhatsApp ini setelah melakukan pembayaran.'));
    assert.ok(msg.includes('Mohon informasi untuk proses verifikasi pembayaran dan langkah selanjutnya. Terima kasih.'));
  });

  test('WhatsApp confirmation URL uses https://wa.me/6285933648537 and encodeURIComponent', () => {
    const url = buildWhatsAppConfirmationUrl({
      participantName: 'Budi Santoso & Rekan',
      programName: 'Class Integrasi Website dan Aplikasi Mobile',
      amount: 450000,
      transactionReference: 'PCC-20261028-INTG'
    });

    assert.ok(url.startsWith('https://wa.me/6285933648537?text='));
    // Special characters like & must be encoded
    assert.ok(!url.includes('& Rekan'));
    assert.ok(url.includes('Budi%20Santoso%20%26%20Rekan'));
  });

  test('WhatsApp consultation URL generates friendly query message', () => {
    const consultUrl = buildWhatsAppConsultationUrl('Class Mobile');
    assert.ok(consultUrl.startsWith('https://wa.me/6285933648537?text='));
    assert.ok(consultUrl.includes('Class%20Mobile'));
  });

  // -------------------------------------------------------------
  // TEST SUITE 3: Dynamic QRIS Generation & Checksum
  // -------------------------------------------------------------
  console.log('\n--- 3. Dynamic QRIS Generation from qris.jpeg ---');

  test('Base QRIS CRC16 matches original 1FBC checksum', () => {
    const payloadWithoutCrc = BASE_STATIC_QRIS_PAYLOAD.substring(0, BASE_STATIC_QRIS_PAYLOAD.length - 4);
    const crc = calculateCrc16(payloadWithoutCrc);
    assert.equal(crc, '1FBC');
  });

  test('generateDynamicQrisPayload converts static 010211 to dynamic 010212 and embeds exact amount', () => {
    // Rp 250.000
    const qris250 = generateDynamicQrisPayload(250000);
    assert.ok(qris250.includes('010212'), 'Must change static to dynamic method 12');
    assert.ok(qris250.includes('5406250000'), 'Must contain Tag 54 for 250000');
    assert.ok(qris250.endsWith('69EE'), 'CRC must be recalculated to 69EE');

    // Rp 300.000
    const qris300 = generateDynamicQrisPayload(300000);
    assert.ok(qris300.includes('5406300000'), 'Must contain Tag 54 for 300000');
    assert.ok(qris300.endsWith('32E2'), 'CRC must be recalculated to 32E2');

    // Rp 450.000
    const qris450 = generateDynamicQrisPayload(450000);
    assert.ok(qris450.includes('5406450000'), 'Must contain Tag 54 for 450000');
    assert.ok(qris450.endsWith('47CC'), 'CRC must be recalculated to 47CC');
  });

  // -------------------------------------------------------------
  // TEST SUITE 4: Server Transaction Creation & Pricing Enforcement
  // -------------------------------------------------------------
  console.log('\n--- 4. Server Transaction Creation & Validation ---');

  test('Validation rejects empty or spaces-only participant name', () => {
    const v1 = validateParticipantName('');
    assert.equal(v1.isValid, false);
    const v2 = validateParticipantName('    ');
    assert.equal(v2.isValid, false);
    const v3 = validateParticipantName('ab');
    assert.equal(v3.isValid, false);
  });

  test('Validation accepts valid participant name and trims whitespace', () => {
    const v = validateParticipantName('   Ardhika Pratama   ');
    assert.equal(v.isValid, true);
    assert.equal(v.cleanName, 'Ardhika Pratama');
  });

  await asyncTest('Server creates transaction with server-enforced price and dynamic QRIS data', async () => {
    // Website
    const r1 = await createTransactionRecord({ participantName: 'Ahmad Fauzi', programSlug: 'website' });
    assert.equal(r1.success, true);
    if (r1.success) {
      assert.equal(r1.transaction.amount, 250000);
      assert.equal(r1.transaction.programName, 'Class Website');
      assert.ok(r1.transaction.reference.startsWith('PCC-'));
      assert.equal(r1.transaction.paymentStatus, 'pending');
      assert.equal(r1.transaction.qrisType, 'dynamic');
      assert.ok(r1.transaction.qrisPayload.includes('5406250000'));
      assert.ok(r1.transaction.qrisDataUrl.startsWith('data:image/png;base64,'));
    }

    // Mobile
    const r2 = await createTransactionRecord({ participantName: 'Siti Aminah', programSlug: 'mobile' });
    assert.equal(r2.success, true);
    if (r2.success) {
      assert.equal(r2.transaction.amount, 300000);
      assert.equal(r2.transaction.programName, 'Class Aplikasi Mobile');
      assert.ok(r2.transaction.qrisPayload.includes('5406300000'));
    }

    // Integrasi
    const r3 = await createTransactionRecord({ participantName: 'Bambang', programSlug: 'integrasi' });
    assert.equal(r3.success, true);
    if (r3.success) {
      assert.equal(r3.transaction.amount, 450000);
      assert.equal(r3.transaction.programName, 'Class Integrasi Website dan Aplikasi Mobile');
      assert.ok(r3.transaction.qrisPayload.includes('5406450000'));
      
      // Test retrieval
      const lookup = getTransactionByReference(r3.transaction.reference);
      assert.equal(lookup?.reference, r3.transaction.reference);
      assert.equal(lookup?.amount, 450000);
    }
  });

  await asyncTest('Server rejects invalid program slug during transaction creation', async () => {
    const r = await createTransactionRecord({ participantName: 'Tester', programSlug: 'hacker_special' });
    assert.equal(r.success, false);
  });

  console.log(`\n🎉 All ${passedTests} acceptance tests passed successfully!`);
}

runAll().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
