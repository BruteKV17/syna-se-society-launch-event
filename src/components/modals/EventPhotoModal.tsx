import React from 'react';
import { X, Calendar, MapPin, Award } from 'lucide-react';
import { SynapseEvent } from '../../types';
import { audioService } from '../../services/audioService';

interface EventPhotoModalProps {
  event: SynapseEvent | null;
  onClose: () => void;
}

export const EventPhotoModal: React.FC<EventPhotoModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
      <div className="glass-card w-full max-w-2xl rounded-3xl p-6 overflow-hidden border border-purple-500/40 shadow-2xl">
        <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <button
            onClick={() => {
              audioService.playClick();
              onClose();
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-purple-900/90 text-xs font-mono text-purple-200 border border-purple-400/40">
            {event.category}
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold text-white mb-2">{event.title}</h3>
        <p className="font-sans text-sm text-gray-300 mb-6">{event.description}</p>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-500/20 text-xs font-mono text-purple-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>DATE: {event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300">ATTENDANCE XP: +{event.xpValue} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};
