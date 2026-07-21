import React, { useEffect, useState } from 'react';
import { ConveyorBelt } from './components/ConveyorBelt';
import { GameHUD } from './components/GameHUD';
import { GameOverModal } from './components/GameOverModal';
import { InstructionsModal } from './components/InstructionsModal';
import { TVOrderMonitor } from './components/TVOrderMonitor';
import { useGameEngine } from './hooks/useGameEngine';
import { audioSynth } from './utils/audioSynth';

const App: React.FC = () => {
  const {
    gameState,
    chefExpression,
    validationFeedback,
    setDifficulty,
    startNewGame,
    advanceConveyor,
    selectShape,
    addBatter,
    addFilling,
    addIcing,
    addTopping,
    deliverCake,
    trashCake,
    togglePause,
    toggleMute,
  } = useGameEngine();

  const [showInstructions, setShowInstructions] = useState(false);

  // Initialize BGM on first user interaction (browser autoplay compliance)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!gameState.isAudioMuted) {
        audioSynth.startBGM();
      }
      window.removeEventListener('click', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [gameState.isAudioMuted]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 relative overflow-hidden">
      {/* HUD Header */}
      <GameHUD
        gameState={gameState}
        onTogglePause={togglePause}
        onToggleMute={toggleMute}
        onChangeDifficulty={(d) => startNewGame(d)}
        onNewGame={() => startNewGame()}
      />

      {/* Main Bakery Playfield */}
      <main className="w-full flex flex-col items-center justify-center flex-1 my-1">
        {/* Overhead 1950s TV Order Monitor & Purble Chef Avatar */}
        <TVOrderMonitor order={gameState.currentOrder} chefExpression={chefExpression} />

        {/* Realtime Skeuomorphic Feedback Banner */}
        {validationFeedback && (
          <div className="my-2 py-2 px-8 rounded-full bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 border-3 border-amber-400 text-amber-950 text-xs font-black shadow-xl animate-bounce">
            {validationFeedback}
          </div>
        )}

        {/* Conveyor Belt & Processing Stations */}
        <ConveyorBelt
          activeCakes={gameState.activeCakes}
          onSelectShape={selectShape}
          onAddBatter={addBatter}
          onAddFilling={addFilling}
          onAddIcing={addIcing}
          onAddTopping={addTopping}
          onDeliverCake={deliverCake}
          onTrashCake={trashCake}
          onAdvanceBelt={advanceConveyor}
        />
      </main>

      {/* Footer & Help bar */}
      <footer className="w-full max-w-6xl flex items-center justify-between text-xs text-slate-800 font-bold py-2 border-t-2 border-sky-300/60 mt-2">
        <div>
          <span>Purble Place: Comfy Cakes Edition</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => { audioSynth.playClickPop(); setShowInstructions(true); }}
            className="text-purple-900 hover:text-purple-700 underline cursor-pointer font-black"
          >
            ❓ How to Play
          </button>
          <span>Windows Vista Nostalgia</span>
        </div>
      </footer>

      {/* Game Over Modal */}
      {gameState.isGameOver && (
        <GameOverModal gameState={gameState} onRestart={() => startNewGame()} />
      )}

      {/* Instructions Modal */}
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
};

export default App;
