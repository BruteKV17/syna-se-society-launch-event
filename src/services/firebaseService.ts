import { UserProfile, XPLog, LeaderboardEntry, SynapseEvent, Achievement } from '../types';

const STORAGE_KEYS = {
  USER: 'synapse_user_profile',
  LOGS: 'synapse_xp_logs',
  LEADERBOARD: 'synapse_leaderboard',
  EVENTS: 'synapse_events',
};

// Initial Mock User
const INITIAL_USER: UserProfile = {
  uid: 'synapse_user_001',
  studentId: 'SYN-2026-9482',
  name: 'Alex Vance',
  email: 'alex.vance@synapse.edu',
  level: 3,
  xp: 1450,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  role: 'student',
  badges: ['Initiate', 'Prompt Master', 'Cipher Breaker', 'Web Architect'],
  claimedEvents: ['EVT-001'],
  completedMissions: ['M-01', 'M-02'],
  createdAt: new Date().toISOString(),
};

// Pre-populated Leaderboard
const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    studentId: 'SYN-2026-1001',
    name: 'Elena Rostova',
    level: 5,
    xp: 3850,
    badges: 8,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'Lead Architect'
  },
  {
    rank: 2,
    studentId: 'SYN-2026-1002',
    name: 'Kaelen Voss',
    level: 4,
    xp: 2920,
    badges: 6,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    role: 'AI Specialist'
  },
  {
    rank: 3,
    studentId: 'SYN-2026-1003',
    name: 'Aria Chen',
    level: 4,
    xp: 2740,
    badges: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'Web3 Builder'
  },
  {
    rank: 4,
    studentId: 'SYN-2026-9482',
    name: 'Alex Vance (You)',
    level: 3,
    xp: 1450,
    badges: 4,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'FullStack Explorer'
  },
  {
    rank: 5,
    studentId: 'SYN-2026-1005',
    name: 'Marcus Brody',
    level: 3,
    xp: 1200,
    badges: 3,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Cyber Sec'
  },
  {
    rank: 6,
    studentId: 'SYN-2026-1006',
    name: 'Sophia Patel',
    level: 2,
    xp: 980,
    badges: 3,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    role: 'UI/UX Creator'
  },
  {
    rank: 7,
    studentId: 'SYN-2026-1007',
    name: 'David Kim',
    level: 2,
    xp: 850,
    badges: 2,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'IoT Innovator'
  }
];

const INITIAL_EVENTS: SynapseEvent[] = [
  {
    eventId: 'EVT-2025-01',
    title: 'Synapse Intensive Coding Session 2025',
    date: 'March 14, 2025',
    xpValue: 350,
    description: 'Hands-on live lab session working on deep tech, algorithms, and web applications.',
    category: 'Workshop',
    image: '/gatherings/gathering_2025_1.png'
  },
  {
    eventId: 'EVT-2025-02',
    title: 'Tech Speaker Keynote 2025',
    date: 'June 22, 2025',
    xpValue: 400,
    description: 'Keynote discourse on modern software engineering & AI infrastructure.',
    category: 'Keynote',
    image: '/gatherings/gathering_2025_2.png'
  },
  {
    eventId: 'EVT-2025-03',
    title: 'Synapse Core Assembly 2025',
    date: 'September 18, 2025',
    xpValue: 450,
    description: 'Gathering of core members, student leaders, and faculty advisors.',
    category: 'Orientation',
    image: '/gatherings/gathering_2025_3.jpg'
  },
  {
    eventId: 'EVT-2025-04',
    title: 'Synapse Annual Symposium 2025',
    date: 'November 05, 2025',
    xpValue: 500,
    description: 'Annual gathering showcasing student innovation, projects, and achievements.',
    category: 'Keynote',
    image: '/gatherings/gathering_2025_4.jpg'
  }
];

const INITIAL_LOGS: XPLog[] = [
  {
    logId: 'LOG-101',
    cardId: 'SYN-2026-9482',
    eventId: 'EVT-001',
    eventTitle: 'Orientation & Keynote 2026',
    xpAwarded: 250,
    timestamp: '2026-07-25 14:30:00',
    scannedBy: 'Lead Scanner #01'
  }
];

class DataStoreService {
  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized() {
    if (!localStorage.getItem(STORAGE_KEYS.USER)) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(INITIAL_USER));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LEADERBOARD)) {
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(INITIAL_LEADERBOARD));
    }
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
    if (!localStorage.getItem(STORAGE_KEYS.LOGS)) {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(INITIAL_LOGS));
    }
  }

  public getUser(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  }

  public saveUser(user: UserProfile) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    this.updateLeaderboardForUser(user);
  }

  public getEvents(): SynapseEvent[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return data ? JSON.parse(data) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  }

  public getLeaderboard(): LeaderboardEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      const list: LeaderboardEntry[] = data ? JSON.parse(data) : INITIAL_LEADERBOARD;
      return list.sort((a, b) => b.xp - a.xp).map((entry, index) => ({ ...entry, rank: index + 1 }));
    } catch {
      return INITIAL_LEADERBOARD;
    }
  }

  public getLogs(): XPLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LOGS);
      return data ? JSON.parse(data) : INITIAL_LOGS;
    } catch {
      return INITIAL_LOGS;
    }
  }

  public awardXP(
    targetStudentId: string,
    xpAmount: number,
    eventId: string,
    eventTitle: string,
    scannedBy: string = 'Admin Scanner'
  ): { success: boolean; message: string; newXp?: number; newLevel?: number; alreadyClaimed?: boolean } {
    const user = this.getUser();

    // Check if target is current user or generic student
    if (user.studentId === targetStudentId || targetStudentId === 'SYN-2026-9482') {
      if (user.claimedEvents.includes(eventId)) {
        return {
          success: false,
          alreadyClaimed: true,
          message: `XP already claimed for event: ${eventTitle} (ID: ${eventId})`,
        };
      }

      user.xp += xpAmount;
      user.claimedEvents.push(eventId);

      // Level calculation: Every 500 XP = +1 Level
      const calculatedLevel = Math.max(1, Math.floor(user.xp / 500) + 1);
      const prevLevel = user.level;
      user.level = calculatedLevel;

      this.saveUser(user);

      // Add log
      const logs = this.getLogs();
      const newLog: XPLog = {
        logId: `LOG-${Date.now().toString().slice(-5)}`,
        cardId: user.studentId,
        eventId,
        eventTitle,
        xpAwarded: xpAmount,
        timestamp: new Date().toLocaleString(),
        scannedBy,
      };
      logs.unshift(newLog);
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));

      return {
        success: true,
        message: `Awarded +${xpAmount} XP to ${user.name}! ${calculatedLevel > prevLevel ? `LEVEL UP! Now Level ${calculatedLevel}` : ''}`,
        newXp: user.xp,
        newLevel: user.level,
      };
    } else {
      // Award to leaderboard entry
      const leaderboard = this.getLeaderboard();
      const target = leaderboard.find((item) => item.studentId === targetStudentId);
      if (target) {
        target.xp += xpAmount;
        target.level = Math.max(1, Math.floor(target.xp / 500) + 1);
        localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(leaderboard));

        const logs = this.getLogs();
        logs.unshift({
          logId: `LOG-${Date.now().toString().slice(-5)}`,
          cardId: targetStudentId,
          eventId,
          eventTitle,
          xpAwarded: xpAmount,
          timestamp: new Date().toLocaleString(),
          scannedBy,
        });
        localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));

        return {
          success: true,
          message: `Awarded +${xpAmount} XP to ${target.name}!`,
          newXp: target.xp,
          newLevel: target.level,
        };
      } else {
        return {
          success: false,
          message: `Student ID "${targetStudentId}" not found in database.`,
        };
      }
    }
  }

  private updateLeaderboardForUser(user: UserProfile) {
    const list = this.getLeaderboard();
    const idx = list.findIndex((item) => item.studentId === user.studentId);
    if (idx !== -1) {
      list[idx].xp = user.xp;
      list[idx].level = user.level;
      list[idx].badges = user.badges.length;
    } else {
      list.push({
        rank: list.length + 1,
        studentId: user.studentId,
        name: `${user.name} (You)`,
        level: user.level,
        xp: user.xp,
        badges: user.badges.length,
        avatar: user.avatar,
        role: user.role === 'student' ? 'Society Member' : 'Society Lead',
      });
    }
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(list));
  }

  public exportLogsCSV() {
    const logs = this.getLogs();
    const headers = ['Log ID', 'Card ID', 'Event ID', 'Event Title', 'XP Awarded', 'Timestamp', 'Scanned By'];
    const rows = logs.map((l) => [l.logId, l.cardId, l.eventId, `"${l.eventTitle}"`, l.xpAwarded, `"${l.timestamp}"`, `"${l.scannedBy}"`]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `synapse_xp_audit_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const dataStoreService = new DataStoreService();
