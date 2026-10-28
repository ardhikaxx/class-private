import assert from 'node:assert/strict';
import { POST } from '../app/api/transactions/route.ts';
import { GET } from '../app/api/transactions/[reference]/route.ts';
import { NextRequest } from 'next/server';

console.log('🧪 Starting API Route Verification Tests...\n');

let passedTests = 0;

async function runAsyncTests() {
  // Test 1: Empty participant name validation
  await (async () => {
    const req = new NextRequest('http://localhost:3000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participantName: '   ',
        programSlug: 'website'
      })
    });

    const res = await POST(req);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.ok(data.error.includes('Nama lengkap wajib diisi'));
    console.log('  ✅ PASS: API rejects empty name with status 400 and Indonesian error message');
    passedTests++;
  })();

  // Test 2: Invalid program slug validation
  await (async () => {
    const req = new NextRequest('http://localhost:3000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participantName: 'Muhammad Ardhika',
        programSlug: 'unauthorized_program'
      })
    });

    const res = await POST(req);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.ok(data.error.includes('Program yang dipilih tidak valid'));
    console.log('  ✅ PASS: API rejects invalid program slug with status 400');
    passedTests++;
  })();

  // Test 3: Valid transaction creation for Class Website (enforcing Rp 250.000)
  let websiteRef = '';
  await (async () => {
    const req = new NextRequest('http://localhost:3000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participantName: 'Muhammad Ardhika',
        programSlug: 'website',
        // Client attempts to spoof price:
        price: 50000
      })
    });

    const res = await POST(req);
    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.transaction.participantName, 'Muhammad Ardhika');
    assert.equal(data.transaction.programSlug, 'website');
    assert.equal(data.transaction.programName, 'Class Website');
    // Price MUST be strictly 250000 from server, ignoring spoofed 50000
    assert.equal(data.transaction.amount, 250000);
    assert.equal(data.transaction.paymentStatus, 'pending');
    assert.equal(data.transaction.qrisUrl, '/qris.jpeg');
    assert.ok(data.transaction.reference.startsWith('PCC-'));
    websiteRef = data.transaction.reference;
    console.log(`  ✅ PASS: API creates valid transaction with server-enforced price (Ref: ${websiteRef})`);
    passedTests++;
  })();

  // Test 4: Retrieve transaction via GET /api/transactions/[reference]
  await (async () => {
    const req = new NextRequest(`http://localhost:3000/api/transactions/${websiteRef}`);
    const res = await GET(req, { params: Promise.resolve({ reference: websiteRef }) });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.transaction.reference, websiteRef);
    assert.equal(data.transaction.amount, 250000);
    console.log('  ✅ PASS: API retrieves created transaction by reference with status 200');
    passedTests++;
  })();

  // Test 5: Valid transaction creation for Class Integrasi (enforcing Rp 450.000)
  await (async () => {
    const req = new NextRequest('http://localhost:3000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participantName: 'Siti Rahma',
        programSlug: 'integrasi'
      })
    });

    const res = await POST(req);
    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.transaction.amount, 450000);
    assert.equal(data.transaction.programName, 'Class Integrasi Website dan Aplikasi Mobile');
    console.log('  ✅ PASS: API creates Class Integrasi transaction with exact Rp 450.000');
    passedTests++;
  })();

  console.log(`\n🎉 All ${passedTests} API route tests passed successfully!`);
}

runAsyncTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
