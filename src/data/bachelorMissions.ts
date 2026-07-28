export interface BachelorMission {
  id: string;
  badge: string; // e.g. "MISSION 01 / 03"
  title: string;
  subtitle: string;
  description: string;
  objectives: string[];
  xpReward: number;
  icon: string;
}

export interface TeamData {
  id: 'teamA' | 'teamB';
  name: string;
  badge: string;
  themeColor: 'purple' | 'cyan';
  description: string;
  potentialXp: number;
  missions: BachelorMission[];
}

export const BACHELOR_DATA: { teamA: TeamData; teamB: TeamData } = {
  teamA: {
    id: 'teamA',
    name: 'TEAM A',
    badge: 'THINK LIKE AI',
    themeColor: 'purple',
    description: 'Master prompt engineering, emoji signal decoding, and neural network restoration protocols.',
    potentialXp: 1200,
    missions: [
      {
        id: 'alpha-m1',
        badge: 'MISSION 01 / 03',
        title: 'Prompt Engineering Challenge',
        subtitle: 'Visual Memorization & Gemini Prompting',
        description: 'Observe an AI-generated image for 5 seconds, then write the perfect prompt to recreate it in Gemini.',
        objectives: [
          'Observe reference images for visual memorization (Subject, Lighting, Composition)',
          'Apply the 4-part Prompt Engineering Formula (Subject, Environment, Style, Lighting)',
          'Craft and evaluate your detailed prompt to match reference visual parameters'
        ],
        xpReward: 400,
        icon: '✍️'
      },
      {
        id: 'alpha-m2',
        badge: 'MISSION 02 / 03',
        title: 'AI Emoji Decoder',
        subtitle: 'Corrupted Language Module Recovery',
        description: 'Decode 15 emoji transmissions from the Synapse AI. The language module is corrupted — only emojis remain.',
        objectives: [
          'Observe corrupted emoji transmission streams from the Synapse AI core',
          'Decode tech terminology, AI algorithms, and ciphers from emoji combinations',
          'Submit correct tech terms before transmission signal timeout'
        ],
        xpReward: 400,
        icon: '🤖'
      },
      {
        id: 'alpha-m3',
        badge: 'MISSION 03 / 03',
        title: 'Operation Synapse Restore',
        subtitle: 'Neural Core Recovery Protocol',
        description: 'Restore 5 encrypted system modules in 15 minutes to bring the Synapse AI Core back online.',
        objectives: [
          'Re-order and align 5 corrupted neural system modules in correct boot sequence',
          'Perform phishing URL verification and cryptographic cipher analysis',
          'Synchronize core neural frequencies to restore full AI system online status'
        ],
        xpReward: 400,
        icon: '🧠'
      }
    ]
  },
  teamB: {
    id: 'teamB',
    name: 'TEAM B',
    badge: 'CREATE WITH AI',
    themeColor: 'cyan',
    description: 'Unleash rapid game prototyping, computer vision analysis, and prompt relay chain dynamics.',
    potentialXp: 1200,
    missions: [
      {
        id: 'beta-m1',
        badge: 'MISSION 01 / 03',
        title: "Wizard's Game Forge",
        subtitle: 'Gemini Canvas Rapid Game Lab',
        description: 'Use Gemini Canvas to build a magical wizard-themed browser game in just 5 minutes.',
        objectives: [
          'Design spellcasting mechanics, potion physics, and player collision loops',
          'Prompt Gemini Canvas for instant single-file HTML5/JS game generation',
          'Test, compile, and execute playable game prototype within 5 minutes'
        ],
        xpReward: 400,
        icon: '✨'
      },
      {
        id: 'beta-m2',
        badge: 'MISSION 02 / 03',
        title: 'AI Vision Challenge',
        subtitle: 'Computer Vision Perception Test',
        description: 'Identify hidden technology from heavily zoomed images — see the world through the eyes of Computer Vision.',
        objectives: [
          'Analyze high-magnification macro views of tech hardware & silicon structures',
          'Decode visual telemetry parameters before computer vision scan completes',
          'Match visual features to correct hardware architectures'
        ],
        xpReward: 400,
        icon: '👁️'
      },
      {
        id: 'beta-m3',
        badge: 'MISSION 03 / 03',
        title: 'Prompt Relay',
        subtitle: 'Semantic Chain & Information Decay',
        description: 'Whisper a prompt through 10 agents. Watch how AI output changes with every word lost along the chain.',
        objectives: [
          'Transmit detailed prompts sequentially through a 10-node agent relay network',
          'Track semantic drift, word loss, and acoustic distortion per hop',
          'Reconstruct original prompt intent from final distorted transmission'
        ],
        xpReward: 400,
        icon: '📡'
      }
    ]
  }
};
