import React from 'react';
import { X, Award, Shield, QrCode, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { UserProfile } from '../../types';
import { audioService } from '../../services/audioService';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  const currentLevelXp = (user.level - 1) * 500;
  const nextLevelXp = user.level * 500;
  const xpInCurrentLevel = user.xp - currentLevelXp;
  const levelProgress = Math.min(100, Math.max(0, (xpInCurrentLevel / 500) * 100));

  const getLevelTitle = (lvl: number) => {
    if (lvl === 1) return 'Novice Initiate';
    if (lvl === 2) return 'Cyber Apprentice';
    if (lvl === 3) return 'Synapse Developer';
    if (lvl === 4) return 'Tech Architect';
    return 'Synapse Master Lead';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
      <div className="glass-card w-full max-w-3xl max-h-[90vh] rounded-3xl p-6 sm:p-8 overflow-y-auto border border-purple-500/40 shadow-2xl shadow-purple-900/40 no-scrollbar">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-900/50 border border-purple-400/30 text-purple-300">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white">STUDENT DIGITAL CARD & HUD</h2>
              <p className="text-xs font-mono text-purple-300/80">OFFICIAL SYNAPSE SOCIETY MEMERSHIP PASS</p>
            </div>
          </div>
          <button
            onClick={() => {
              audioService.playClick();
              onClose();
            }}
            className="p-2.5 rounded-full hover:bg-purple-900/40 text-purple-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Holographic Digital Card Mockup */}
        <div className="my-6">
          <div className="holo-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-purple-400/40 shadow-neon-purple">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Left: Avatar & Details */}
              <div className="flex items-center gap-5">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-purple-400 shadow-lg shadow-purple-500/30">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-purple-900/90 text-center text-[10px] font-mono font-bold text-purple-200 py-0.5">
                    LVL {user.level}
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-900/60 border border-purple-400/30 text-[11px] font-mono text-purple-300 mb-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>{getLevelTitle(user.level)}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">{user.name}</h3>
                  <div className="font-mono text-xs text-purple-300/80">{user.studentId}</div>
                  <div className="font-mono text-xs text-purple-400/60 mt-0.5">{user.email}</div>
                </div>
              </div>

              {/* Right: Live Personal QR Code */}
              <div className="flex flex-col items-center bg-white/5 p-3 rounded-2xl border border-white/10">
                <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shadow-inner">
                  {/* SVG Mock QR Code */}
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-black">
                    <rect x="0" y="0" width="30" height="30" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />
                    <rect x="70" y="0" width="30" height="30" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />
                    <rect x="0" y="70" width="30" height="30" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />
                    <rect x="35" y="10" width="10" height="20" />
                    <rect x="50" y="25" width="15" height="15" />
                    <rect x="35" y="60" width="20" height="10" />
                    <rect x="65" y="60" width="25" height="25" />
                    <rect x="40" y="80" width="15" height="15" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 mt-2 text-[10px] font-mono text-purple-300">
                  <QrCode className="w-3 h-3 text-purple-400" />
                  <span>PASS ID QR</span>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-6 pt-4 border-t border-purple-500/20">
              <div className="flex justify-between items-center text-xs font-mono text-purple-200 mb-2">
                <span>XP PROGRESSION: {user.xp} XP</span>
                <span>NEXT TIER: {nextLevelXp} XP</span>
              </div>
              <div className="w-full h-3 rounded-full bg-purple-950/80 overflow-hidden p-0.5 border border-purple-500/30">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-magenta to-cyan-400 shadow-neon-violet transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="mb-6">
          <h4 className="font-mono text-xs font-bold text-purple-300 mb-3 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400" /> UNLOCKED ACHIEVEMENTS & BADGES
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {user.badges.map((badge, idx) => (
              <div
                key={idx}
                className="glass-card rounded-xl p-3 flex items-center gap-3 border border-purple-500/20 hover:border-purple-400/40 transition-all"
              >
                <div className="p-2 rounded-lg bg-purple-900/40 text-purple-300 border border-purple-500/30">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="font-bold text-xs text-white">{badge}</div>
                  <div className="text-[10px] font-mono text-purple-400">UNLOCKED</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claimed Events History */}
        <div>
          <h4 className="font-mono text-xs font-bold text-purple-300 mb-3 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" /> CLAIMED EVENT ATTENDANCE HISTORY
          </h4>
          <div className="space-y-2">
            {user.claimedEvents.map((evtId, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-center justify-between text-xs font-mono">
                <span className="text-purple-200">EVENT PASS CLAIMED: {evtId}</span>
                <span className="text-emerald-400 font-bold">+250 XP VERIFIED</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
