import React from 'react';
import { GameState } from '../types/game';

interface GameOverModalProps {
  gameState: GameState;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ gameState, onRestart }) => {
  const { score, ordersCompleted, streakCount, highScores, difficulty } = gameState;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="bg-gradient-to-b from-purple-900 via-slate-900 to-purple-950 max-w-md w-full p-6 rounded-3xl border-4 border-purple-500 shadow-2xl flex flex-col items-center text-center">
        {/* Game Over Header */}
        <div className="text-5xl mb-2 animate-bounce">🎂</div>
        <h2 className="text-3xl font-black text-amber-300 tracking-wide font-['Fredoka'] drop-shadow-md">
          GAME OVER!
        </h2>
        <p className="text-xs text-purple-200 mt-1 mb-4 font-semibold">
          You ran out of lives! The bakery shift has ended.
        </p>

        {/* Final Stats Card */}
        <div className="w-full bg-slate-950/80 p-4 rounded-2xl border border-purple-500/30 mb-6 flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm border-b border-purple-800/40 pb-1.5">
            <span className="text-purple-300 font-semibold">Final Score:</span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              {score.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>Difficulty Mode:</span>
            <span className="font-bold capitalize text-cyan-400">{difficulty}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>Cakes Delivered:</span>
            <span className="font-bold text-white">{ordersCompleted}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>Best Streak:</span>
            <span className="font-bold text-emerald-400">🔥 x{streakCount}</span>
          </div>
        </div>

        {/* High Scores Leaderboard */}
        <div className="w-full mb-6">
          <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-widest mb-2">
            🏆 Bakery Leaderboard
          </h3>
          <div className="max-h-36 overflow-y-auto bg-slate-950 p-2 rounded-xl border border-purple-900/50 space-y-1 text-xs text-left">
            {highScores.length === 0 ? (
              <div className="text-center text-gray-500 py-2">No scores recorded yet!</div>
            ) : (
              highScores.map((scoreItem, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center px-2 py-1 bg-purple-950/40 rounded border border-purple-900/30"
                >
                  <span className="font-bold text-amber-300">{idx + 1}. {scoreItem.name}</span>
                  <span className="text-purple-300 text-[10px] capitalize">{scoreItem.difficulty}</span>
                  <span className="font-mono font-bold text-white">{scoreItem.score.toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Play Again Button */}
        <button
          onClick={onRestart}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-lg shadow-xl border-2 border-emerald-300 transition-all active:scale-95 cursor-pointer"
        >
          PLAY AGAIN 🔄
        </button>
      </div>
    </div>
  );
};
