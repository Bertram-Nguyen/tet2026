import { TOTAL_ENVELOPES, WISHES, EMOJIS, FIXED_AMOUNT } from './constants';
import { EnvelopeData } from './types';

// Seeded random for consistent positions if needed, but simple random is fine here for layout
export const getRandomWish = () => WISHES[Math.floor(Math.random() * WISHES.length)];
export const getRandomEmoji = () => EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

// Generate envelope positions based on a spiral/flower pattern around a center hole
export const generateEnvelopes = (): EnvelopeData[] => {
  const envelopes: EnvelopeData[] = [];
  // Center is 50%, 50%
  // We want to distribute 2026 items.
  // We leave a hole in the middle for the tree (approx 20% radius).
  
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.3999 rad
  
  // Layout parameters
  const centerX = 50;
  const centerY = 50;
  const startRadius = 18; // Start outside the tree
  const maxRadius = 150; // Extend well beyond screen to allow scrolling
  const scale = (maxRadius - startRadius) / Math.sqrt(TOTAL_ENVELOPES);

  for (let i = 0; i < TOTAL_ENVELOPES; i++) {
    const r = startRadius + scale * Math.sqrt(i);
    const theta = i * goldenAngle;

    const x = centerX + r * Math.cos(theta);
    const y = centerY + r * Math.sin(theta);
    
    // Convert to percentage strings
    // We add some jitter to make it look more organic/flower-like
    const jitterX = (Math.random() - 0.5) * 2;
    const jitterY = (Math.random() - 0.5) * 2;

    envelopes.push({
      id: i,
      isOpen: false,
      amount: FIXED_AMOUNT,
      wish: "",
      emoji: getRandomEmoji(),
      top: `${y + jitterY}%`,
      left: `${x + jitterX}%`,
      rotation: Math.random() * 360
    });
  }
  
  return envelopes;
};

export const formatMoney = (amount: number) => {
  // Manual formatting: 8386 -> "8386"
  return `${amount}`;
};