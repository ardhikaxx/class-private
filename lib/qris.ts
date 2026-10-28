import QRCode from 'qrcode';

/**
 * Base Static QRIS payload decoded directly from D:\class-private\public\qris.jpeg
 * Merchant: Yanuar Ardhika ID, Digita (GoPay / National QRIS)
 */
export const BASE_STATIC_QRIS_PAYLOAD =
  '00020101021126610014COM.GO-JEK.WWW01189360091438465549940210G8465549940303UMI51440014ID.CO.QRIS.WWW0215ID10264739285820303UMI5204899953033605802ID5925Yanuar Ardhika ID, Digita6009BONDOWOSO61056828162140703A01110362163041FBC';

export const QRIS_MERCHANT_INFO = {
  name: 'Yanuar Ardhika ID, Digita',
  city: 'BONDOWOSO',
  postalCode: '68281',
  nationalQrisId: 'ID1026473928582',
  acquirer: 'GoPay / National QRIS'
} as const;

/**
 * Calculates EMVCo / QRIS CRC16-CCITT checksum
 * Polynomial: 0x1021, Initial: 0xFFFF
 */
export function calculateCrc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    const code = data.charCodeAt(i);
    crc ^= code << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Converts a static QRIS payload into a Dynamic QRIS payload
 * with the exact transaction amount embedded and validated
 */
export function generateDynamicQrisPayload(
  amount: number,
  basePayload: string = BASE_STATIC_QRIS_PAYLOAD
): string {
  // 1. Change Point of Initiation Method from Static (11) to Dynamic (12)
  let payload = basePayload.replace('010211', '010212');

  // 2. Strip existing CRC tag (6304XXXX) from the end
  const crcIndex = payload.lastIndexOf('6304');
  if (crcIndex !== -1) {
    payload = payload.substring(0, crcIndex);
  }

  // 3. Format Tag 54 (Transaction Amount)
  // Format: "54" + 2-digit length + integer amount
  const amountStr = Math.round(amount).toString();
  const amountLen = amountStr.length.toString().padStart(2, '0');
  const amountTag = `54${amountLen}${amountStr}`;

  // 4. Insert Tag 54 directly after Tag 53 (Currency: 5303360)
  const currencyTag = '5303360';
  const currencyIndex = payload.indexOf(currencyTag);

  if (currencyIndex !== -1) {
    const insertPos = currencyIndex + currencyTag.length;
    payload = payload.slice(0, insertPos) + amountTag + payload.slice(insertPos);
  } else {
    payload += amountTag;
  }

  // 5. Append Tag 63 with length 04 for checksum calculation
  const toHash = payload + '6304';

  // 6. Calculate CRC16 checksum
  const crc = calculateCrc16(toHash);

  return toHash + crc;
}

/**
 * Generates high quality Data URL (base64 image/png) for QR code
 */
export async function generateQrisDataUrl(payload: string): Promise<string> {
  try {
    return await QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'M',
      margin: 2,
      scale: 8,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Error generating QR data URL:', err);
    throw err;
  }
}
