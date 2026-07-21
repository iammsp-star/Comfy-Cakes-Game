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
    <div className="w-full max-w-6xl skeuo-card p-3.5 rounded-3xl flex flex-wrap items-center justify-between gap-4 select-none mb-3">
      {/* Title & Brand */}
      <div className="flex items-center gap-3">
        <div className="text-4xl filter drop-shadow-md transform hover:rotate-12 transition-transform">🎂</div>
        <div>
          <h1 className="text-2xl font-black text-purple-950 tracking-wide font-['Fredoka'] drop-shadow-sm">
            Purble Place: Comfy Cakes
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black text-sky-900 uppercase tracking-wider bg-white/80 px-2.5 py-0.5 rounded-full border border-sky-300 shadow-sm">
              Windows Vista Skeuomorphic Edition
            </span>
          </div>
        </div>
      </div>

      {/* Lives Hearts & Game Stats */}
      <div className="flex items-center gap-6 bg-white/80 px-5 py-2 rounded-2xl border border-sky-200 shadow-inner">
        {/* Lives Counter */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Lives</span>
          <div className="flex gap-1.5 mt-0.5">
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
          <span className="text-[10px] font-black text-purple-900 uppercase tracking-wider">Score</span>
          <span className="text-2xl font-black text-purple-950 font-mono tracking-wider drop-shadow-xs">
            {score.toLocaleString()}
          </span>
        </div>

        {/* Streak Counter */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">Streak</span>
          <span className="text-lg font-black text-emerald-700">
            🔥 x{streakCount}
          </span>
        </div>

        {/* Completed Cakes */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black text-sky-900 uppercase tracking-wider">Cakes</span>
          <span className="text-lg font-black text-sky-950">
            📦 {ordersCompleted}
          </span>
        </div>
      </div>

      {/* Skeuomorphic Controls & Difficulty Toggle */}
      <div className="flex items-center gap-2">
        {/* Difficulty Buttons */}
        <div className="flex bg-slate-200/80 p-1 rounded-2xl border border-slate-300 shadow-inner">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => onChangeDifficulty(d)}
              className={`px-3 py-1 rounded-xl text-xs font-black capitalize transition-all cursor-pointer ${
                difficulty === d
                  ? 'bg-gradient-to-b from-purple-500 to-purple-700 text-white shadow-md border border-purple-400'
                  : 'text-slate-700 hover:text-purple-950 hover:bg-white/60'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Sound / Music Toggle */}
        <button
          onClick={onToggleMute}
          className="skeuo-btn p-2 rounded-xl text-slate-800 font-bold border border-slate-300 cursor-pointer shadow-md"
          title={isAudioMuted ? 'Unmute Audio & Music' : 'Mute Audio & Music'}
        >
          {isAudioMuted ? '🔇' : '🔊'}
        </button>

        {/* Pause Toggle */}
        <button
          onClick={onTogglePause}
          className="skeuo-btn px-3 py-1.5 rounded-xl text-amber-950 text-xs font-black cursor-pointer shadow-md bg-gradient-to-b from-amber-200 to-amber-400"
        >
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </button>

        {/* New Game */}
        <button
          onClick={onNewGame}
          className="skeuo-btn px-3.5 py-1.5 rounded-xl text-emerald-950 text-xs font-black cursor-pointer shadow-md bg-gradient-to-b from-emerald-200 to-emerald-400"
        >
          🔄 Restart
        </button>
      </div>
    </div>
  );
};
