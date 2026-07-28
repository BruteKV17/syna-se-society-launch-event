import React from 'react';
import { X, ShoppingBag, Award, Check } from 'lucide-react';
import { MerchItem } from '../../types';
import { audioService } from '../../services/audioService';

interface MerchDetailModalProps {
  item: MerchItem | null;
  onClose: () => void;
}

export const MerchDetailModal: React.FC<MerchDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
      <div className="glass-card w-full max-w-lg rounded-3xl p-6 overflow-hidden border border-purple-500/40 shadow-2xl">
        <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6 bg-purple-950/60">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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
            {item.tag}
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold text-white mb-2">{item.name}</h3>
        <p className="font-sans text-sm text-gray-300 mb-6">{item.description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
          <div>
            <div className="font-mono text-xs text-purple-300">XP REDEMPTION COST</div>
            <div className="font-display text-2xl font-bold text-cyan-400">{item.xpCost} XP</div>
          </div>
          <button
            onClick={() => {
              audioService.playSuccess();
              alert(`Redemption code for ${item.name} copied to clipboard! Present at Synapse Help Desk.`);
              onClose();
            }}
            className="btn-synapse inline-flex items-center gap-2 text-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>REDEEM MERCH</span>
          </button>
        </div>
      </div>
    </div>
  );
};
