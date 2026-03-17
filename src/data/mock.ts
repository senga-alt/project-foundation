export interface TipEntry {
  id: string;
  txid: string;
  sender: string;
  recipient: string;
  amountSTX: number;
  fee: number;
  message?: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
  blockHeight?: number;
}

export function getTipsForAddress(address: string) {
  const sent = MOCK_TIPS.filter(t => t.sender === address);
  const received = MOCK_TIPS.filter(t => t.recipient === address);
  return { sent, received };
}

export function getTipById(id: string) {
  return MOCK_TIPS.find(t => t.id === id) ?? null;
}

export const MOCK_ADDRESSES = [
  'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
  'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVG4',
  'SP1H1733V5MZ3SZ9XRW9FYJN9N1EQJM4SSB3TD0B6',
  'SP2C2YFP12AJZB1MADC067NC2KNPB5K7TZAY95APC',
  'SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S',
  'SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH0VBP',
  'SP27BB1Y2DGSXZHS7G9YHKTSH6GDAY84CTACC0G5V',
  'SP1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE',
];

const MOCK_MESSAGES = [
  'Great thread on STX stacking rewards 🔥',
  'Thanks for the debugging help!',
  'Love the new feature, keep building!',
  undefined,
  'Coffee money ☕',
  'Awesome tutorial on Clarity smart contracts',
  undefined,
  'Your open source work is incredible',
  'For the meme that made my day 😂',
  'Supporting indie builders 🛠️',
  undefined,
  'That bug fix saved my project!',
  'Happy birthday! 🎂',
  undefined,
  'Tipping for the vibes ✨',
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateMockTips(): TipEntry[] {
  const now = Date.now();
  return Array.from({ length: 15 }, (_, i) => {
    const senderIdx = i % MOCK_ADDRESSES.length;
    let recipientIdx = (i + 3) % MOCK_ADDRESSES.length;
    if (recipientIdx === senderIdx) recipientIdx = (recipientIdx + 1) % MOCK_ADDRESSES.length;

    const amount = parseFloat(randomBetween(0.5, 250).toFixed(2));
    const statusRoll = Math.random();
    const status: TipEntry['status'] = statusRoll > 0.9 ? 'pending' : statusRoll > 0.05 ? 'confirmed' : 'failed';

    return {
      id: `tip-${i}`,
      txid: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      sender: MOCK_ADDRESSES[senderIdx],
      recipient: MOCK_ADDRESSES[recipientIdx],
      amountSTX: amount,
      fee: parseFloat((amount * 0.005).toFixed(4)),
      message: MOCK_MESSAGES[i % MOCK_MESSAGES.length],
      timestamp: new Date(now - i * randomBetween(300_000, 7_200_000)),
      status,
      blockHeight: status === 'confirmed' ? 150_000 + Math.floor(Math.random() * 5000) : undefined,
    };
  });
}

export const MOCK_TIPS = generateMockTips();

export const MOCK_STATS = {
  totalTips: 12_847,
  totalVolumeSTX: 384_291.42,
  activeUsers: 2_341,
};
