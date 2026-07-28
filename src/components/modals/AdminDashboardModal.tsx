import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, Plus, Download, AlertTriangle, CheckCircle, Search, RefreshCw } from 'lucide-react';
import { dataStoreService } from '../../services/firebaseService';
import { audioService } from '../../services/audioService';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserDataChanged: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onUserDataChanged,
}) => {
  const [selectedEventId, setSelectedEventId] = useState('EVT-001');
  const [studentIdInput, setStudentIdInput] = useState('SYN-2026-9482');
  const [customXp, setCustomXp] = useState(250);
  const [scannerActive, setScannerActive] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const events = dataStoreService.getEvents();
  const selectedEvent = events.find((e) => e.eventId === selectedEventId) || events[0];
  const logs = dataStoreService.getLogs();

  const handleAwardXP = (xpAmount: number) => {
    audioService.playClick();
    const result = dataStoreService.awardXP(
      studentIdInput.trim(),
      xpAmount,
      selectedEvent.eventId,
      selectedEvent.title,
      'Lead Scanner #01'
    );

    if (result.success) {
      audioService.playLevelUp();
      setNotification({ type: 'success', text: result.message });
      onUserDataChanged();
    } else {
      audioService.playClick();
      setNotification({ type: 'error', text: result.message });
    }

    setTimeout(() => setNotification(null), 4000);
  };

  const handleExportCSV = () => {
    audioService.playClick();
    dataStoreService.exportLogsCSV();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
      <div className="glass-card w-full max-w-4xl max-h-[92vh] rounded-3xl p-6 sm:p-8 overflow-y-auto border border-purple-500/40 shadow-2xl shadow-purple-900/50 no-scrollbar">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-900/50 border border-purple-400/30 text-purple-300">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white">ADMIN ORGANIZER SCANNER DASHBOARD</h2>
              <p className="text-xs font-mono text-purple-300/80">SYNAPSE SOCIETY EVENT SCAN & REWARD ENGINE</p>
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

        {/* Status Notification Toast */}
        {notification && (
          <div
            className={`my-4 p-4 rounded-xl flex items-center gap-3 font-mono text-xs border ${
              notification.type === 'success'
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/70 border-red-500/40 text-red-300'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span>{notification.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Left Panel: Event & Scanner Setup */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-purple-300 uppercase tracking-wider">
              1. ACTIVE EVENT SELECTOR
            </h3>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full bg-purple-950/50 border border-purple-500/30 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-purple-400"
            >
              {events.map((evt) => (
                <option key={evt.eventId} value={evt.eventId} className="bg-purple-950 text-white">
                  {evt.title} ({evt.xpValue} XP) - {evt.date}
                </option>
              ))}
            </select>

            <div className="glass-card rounded-2xl p-4 border border-purple-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-purple-300">SCANNER MODE: WEBCAM CAMERA</span>
                <button
                  onClick={() => setScannerActive(!scannerActive)}
                  className="px-3 py-1 rounded-full bg-purple-900/50 hover:bg-purple-800/60 text-purple-200 text-xs font-mono border border-purple-400/30 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3 text-purple-400" />
                  {scannerActive ? 'STOP CAMERA' : 'START CAMERA SCAN'}
                </button>
              </div>

              <div className="relative w-full h-44 rounded-xl bg-black/60 border-2 border-dashed border-purple-500/40 flex flex-col items-center justify-center overflow-hidden">
                {scannerActive ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-purple-950/80">
                    <div className="w-32 h-32 border-2 border-cyan-400 rounded-lg relative animate-pulse flex items-center justify-center">
                      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-cyan-400 shadow-neon-cyan animate-scanline" />
                      <QrCode className="w-12 h-12 text-cyan-400/60" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 mt-2">LIVE SCANNING PASS CODE...</span>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <QrCode className="w-10 h-10 text-purple-400/50 mx-auto mb-2" />
                    <p className="text-xs font-mono text-purple-300/70">
                      Camera viewfinder inactive. Click start camera or enter Student ID manually below.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Manual ID Input */}
            <div>
              <label className="block font-mono text-xs text-purple-300 mb-1.5">MANUAL STUDENT CARD ID INPUT</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
                <input
                  type="text"
                  value={studentIdInput}
                  onChange={(e) => setStudentIdInput(e.target.value)}
                  placeholder="e.g. SYN-2026-9482"
                  className="w-full bg-purple-950/50 border border-purple-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>
          </div>

          {/* Right Panel: XP Award Quick Actions */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-purple-300 uppercase tracking-wider">
              2. AWARD XP ACTIONS
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleAwardXP(50)}
                className="glass-card hover:bg-purple-900/40 p-4 rounded-xl border border-purple-500/30 text-left transition-all hover:scale-105"
              >
                <div className="font-bold text-lg text-white">+50 XP</div>
                <div className="text-[11px] font-mono text-purple-300">Quick Participation</div>
              </button>

              <button
                onClick={() => handleAwardXP(100)}
                className="glass-card hover:bg-purple-900/40 p-4 rounded-xl border border-purple-500/30 text-left transition-all hover:scale-105"
              >
                <div className="font-bold text-lg text-purple-300">+100 XP</div>
                <div className="text-[11px] font-mono text-purple-300">Workshop Attendance</div>
              </button>

              <button
                onClick={() => handleAwardXP(250)}
                className="glass-card hover:bg-purple-900/40 p-4 rounded-xl border border-purple-400/50 text-left transition-all hover:scale-105 shadow-neon-violet"
              >
                <div className="font-bold text-lg text-cyan-300">+250 XP</div>
                <div className="text-[11px] font-mono text-cyan-200">Keynote Event Pass</div>
              </button>

              <button
                onClick={() => handleAwardXP(500)}
                className="glass-card hover:bg-purple-900/40 p-4 rounded-xl border border-purple-400/50 text-left transition-all hover:scale-105 shadow-neon-purple"
              >
                <div className="font-bold text-lg text-amber-300">+500 XP</div>
                <div className="text-[11px] font-mono text-amber-200">Hackathon Winner</div>
              </button>
            </div>

            {/* Custom XP */}
            <div className="glass-card rounded-xl p-3 border border-purple-500/20">
              <label className="block font-mono text-[11px] text-purple-300 mb-1">CUSTOM XP AMOUNT</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={customXp}
                  onChange={(e) => setCustomXp(Number(e.target.value))}
                  className="w-full bg-purple-950/50 border border-purple-500/30 rounded-lg px-3 py-1.5 font-mono text-sm text-white"
                />
                <button
                  onClick={() => handleAwardXP(customXp)}
                  className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold shrink-0 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> AWARD
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="mt-6 pt-6 border-t border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-mono text-xs font-bold text-purple-300 uppercase tracking-wider">
              REAL-TIME SCAN AUDIT LOG
            </h4>
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-xl bg-purple-900/50 hover:bg-purple-800/60 border border-purple-500/30 text-purple-200 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" /> EXPORT CSV REPORT
            </button>
          </div>

          <div className="max-h-48 overflow-y-auto rounded-xl border border-purple-500/20 no-scrollbar">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-purple-950/80 text-purple-300 border-b border-purple-500/30 sticky top-0">
                <tr>
                  <th className="p-2.5">CARD ID</th>
                  <th className="p-2.5">EVENT</th>
                  <th className="p-2.5">XP AWARDED</th>
                  <th className="p-2.5">TIMESTAMP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                {logs.map((log) => (
                  <tr key={log.logId} className="hover:bg-purple-900/20 text-purple-200">
                    <td className="p-2.5 font-bold">{log.cardId}</td>
                    <td className="p-2.5">{log.eventTitle}</td>
                    <td className="p-2.5 text-emerald-400 font-bold">+{log.xpAwarded} XP</td>
                    <td className="p-2.5 text-purple-400/80">{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
