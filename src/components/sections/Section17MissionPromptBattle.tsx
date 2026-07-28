import React, { useState } from 'react';
import { Bot, Send, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { dataStoreService } from '../../services/firebaseService';

interface SectionProps {
  onUserDataChanged: () => void;
}

export const Section17MissionPromptBattle: React.FC<SectionProps> = ({ onUserDataChanged }) => {
  const [promptInput, setPromptInput] = useState(
    'Act as a Senior Synapse AI Architect and generate a 3-step solution for low-latency edge inference.'
  );
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleRunPrompt = () => {
    if (!promptInput.trim()) return;
    audioService.playClick();
    setIsEvaluating(true);

    setTimeout(() => {
      const calculatedScore = Math.min(98, 80 + Math.floor((promptInput.length % 20) * 1.2));
      setScore(calculatedScore);
      setIsEvaluating(false);

      if (!isCompleted) {
        setIsCompleted(true);
        audioService.playLevelUp();
        dataStoreService.awardXP('SYN-2026-9482', 200, 'MISSION-01', 'Mission 1: Prompt Battle', 'System Simulator');
        onUserDataChanged();
      }
    }, 1200);
  };

  return (
    <section className="full-section justify-center items-center">
      <div className="max-w-4xl mx-auto px-6 z-10 w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>MISSION 01 • PROMPT BATTLE ARENA</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-2">
            AI PROMPT ARENA CHALLENGE
          </h2>
          <p className="font-sans text-xs sm:text-base text-gray-300">
            Craft an optimal system prompt for the Synapse Neural Evaluator to score 90+ points and claim +200 XP!
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl">
          <div className="flex items-center justify-between mb-4 font-mono text-xs text-purple-300">
            <span>TARGET MODEL: SYNAPSE-LLM-v4</span>
            <span className="text-emerald-400 font-bold">REWARD: +200 XP</span>
          </div>

          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            rows={4}
            className="w-full bg-purple-950/60 border border-purple-500/30 rounded-2xl p-4 font-mono text-sm text-white focus:outline-none focus:border-purple-400 mb-4"
            placeholder="Type system prompt instructions..."
          />

          <div className="flex items-center justify-between">
            <button
              onClick={handleRunPrompt}
              disabled={isEvaluating}
              className="btn-synapse inline-flex items-center gap-2 text-sm"
            >
              {isEvaluating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>EVALUATING PROMPT...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>EVALUATE PROMPT SCORE</span>
                </>
              )}
            </button>

            {score !== null && (
              <div className="flex items-center gap-3 font-mono">
                <div className="text-right">
                  <div className="text-xs text-purple-300">ARENA SCORE</div>
                  <div className="text-2xl font-bold text-cyan-400">{score} / 100</div>
                </div>
                {isCompleted && <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
