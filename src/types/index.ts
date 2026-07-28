export interface UserProfile {
  uid: string;
  studentId: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  avatar: string;
  role: 'student' | 'admin' | 'lead';
  badges: string[];
  claimedEvents: string[];
  activeMission?: string;
  completedMissions: string[];
  createdAt: string;
}

export interface CharacterCard {
  cardId: string;
  studentId: string;
  studentName: string;
  level: number;
  levelTitle: string;
  xp: number;
  nextLevelXp: number;
  badgeCount: number;
  avatarUrl: string;
  primaryColor: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Architect';
}

export interface XPLog {
  logId: string;
  cardId: string;
  eventId: string;
  eventTitle: string;
  xpAwarded: number;
  timestamp: string;
  scannedBy: string;
}

export interface Achievement {
  achievementId: string;
  badgeName: string;
  badgeIcon: string;
  description: string;
  category: 'Event' | 'Mission' | 'Contribution' | 'Special';
  unlockedAt: string;
}

export interface SynapseEvent {
  eventId: string;
  title: string;
  date: string;
  xpValue: number;
  description: string;
  category: 'Workshop' | 'Hackathon' | 'Orientation' | 'Community' | 'Keynote';
  image: string;
}

export interface MerchItem {
  id: string;
  name: string;
  category: string;
  xpCost: number;
  price: string;
  image: string;
  tag: string;
  description: string;
  available: boolean;
}

export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  track: 'A' | 'B' | 'Both'; // A: AI Hacker, B: Product Builder
  xpReward: number;
  badgeReward: string;
  status: 'locked' | 'unlocked' | 'completed';
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  name: string;
  level: number;
  xp: number;
  badges: number;
  avatar: string;
  role: string;
}
