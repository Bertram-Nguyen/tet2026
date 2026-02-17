export interface UserData {
  senderName: string;
  bankName: string;
  accountNumber: string;
}

export interface EnvelopeData {
  id: number;
  isOpen: boolean;
  amount: number;
  wish: string;
  emoji: string;
  top: string;
  left: string;
  rotation: number;
}

export interface LeaderboardItem {
  name: string;
  time: string;
  amount: number;
}