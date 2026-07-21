import React from 'react';
import { Difficulty, GameState } from '../types/game';

interface GameHUDProps {
  gameState: GameState;
  onTogglePause: () => void;
  onToggleMute: () => void;
  onChangeDifficulty: (diff: Difficulty) => void;
  onNewGame: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  gameState,
  onTogglePause,
  onToggleMute,
  onChangeDifficulty,
  onNewGame,
}) => {
  const { score, lives, streakCount, ordersCompleted, difficulty, isPaused, isAudioMuted } = gameState;

  return (
    <div className="w-full max-w-6xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 p-3 rounded-2xl border-4 border-purple-500/50 shadow-2xl flex flex-wrap items-center justify-between gap-4 select-none mb-4">
      {/* Title & Brand */}
      <div className="flex items-center gap-3">
        <div className="text-3xl filter drop-shadow-md">🎂</div>
        <div>
          <h1 className="text-xl font-black text-amber-300 tracking-wide drop-shadow-md font-['Fredoka']">
            Purble Place: Comfy Cakes
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest bg-purple-950/80 px-2 py-0.5 rounded border border-purple-600">
              Classic Windows Game
            </span>
          </div>
        </div>
      </div>

      {/* Lives Hearts & Stats */}
      <div className="flex items-center gap-6 bg-slate-900/80 px-4 py-2 rounded-xl border border-purple-500/30">
        {/* Lives Counter */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-purple-300 uppercase">Lives</span>
          <div className="flex gap-1 mt-0.5">
            {[1, 2, 3].map((heartIdx) => (
              <span
                key={heartIdx}
                className={`text-xl transition-all duration-300 ${
                  heartIdx <= lives
                    ? 'scale-100 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                    : 'scale-75 opacity-30 grayscale'
                }`}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>

        {/* Score Display */}
        <div className="flex flex-col items-center min-w-[90px]">
          <span className="text-[10px] font-bold text-amber-300 uppercase">Score</span>
          <span className="text-2xl font-black text-white font-mono tracking-wider">
            {score.toLocaleString()}
          </span>
        </div>

        {/* Streak Counter */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-emerald-300 uppercase">Streak</span>
          <span className="text-lg font-black text-emerald-400">
            🔥 x{streakCount}
          </span>
        </div>

        {/* Completed Cakes */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-cyan-300 uppercase">Cakes</span>
          <span className="text-lg font-extrabold text-cyan-200">
            📦 {ordersCompleted}
          </span>
        </div>
      </div>

      {/* Controls & Difficulty Toggle */}
      <div className="flex items-center gap-2">
        {/* Difficulty buttons */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-purple-500/30">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => onChangeDifficulty(d)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                difficulty === d
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-purple-300 hover:text-white hover:bg-purple-800/40'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Mute Toggle */}
        <button
          onClick={onToggleMute}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-purple-500/30 transition-all cursor-pointer shadow-md"
          title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isAudioMuted ? '🔇' : '🔊'}
        </button>

        {/* Pause Toggle */}
        <button
          onClick={onTogglePause}
          className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md border border-amber-300"
        >
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </button>

        {/* New Game */}
        <button
          onClick={onNewGame}
          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all cursor-pointer shadow-md border border-emerald-300"
        >
          🔄 Restart
        </button>
      </div>
    </div>
  );
};
