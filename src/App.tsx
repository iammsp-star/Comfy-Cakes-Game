import React, { useEffect, useState } from 'react';
import { ConveyorBelt } from './components/ConveyorBelt';
import { GameHUD } from './components/GameHUD';
import { GameOverModal } from './components/GameOverModal';
import { InstructionsModal } from './components/InstructionsModal';
import { TVOrderMonitor } from './components/TVOrderMonitor';
import { useGameEngine } from './hooks/useGameEngine';

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

  // Automatic Conveyor Belt Timer
  useEffect(() => {
    if (gameState.isPaused || gameState.isGameOver) return;

    const interval = setInterval(() => {
      advanceConveyor();
    }, gameState.conveyorSpeed);

    return () => clearInterval(interval);
  }, [gameState.isPaused, gameState.isGameOver, gameState.conveyorSpeed, advanceConveyor]);

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
      <main className="w-full flex flex-col items-center justify-center flex-1 my-2">
        {/* Overhead TV Order Monitor & Chef Avatar */}
        <TVOrderMonitor order={gameState.currentOrder} chefExpression={chefExpression} />

        {/* Realtime Validation Feedback Banner */}
        {validationFeedback && (
          <div className="my-2 py-1.5 px-6 rounded-full bg-slate-900/90 border-2 border-amber-400 text-amber-300 text-xs font-bold shadow-xl animate-bounce">
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
      <footer className="w-full max-w-6xl flex items-center justify-between text-xs text-purple-300/80 py-2 border-t border-purple-950">
        <div>
          <span>Purble Place: Comfy Cakes Edition</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowInstructions(true)}
            className="hover:text-amber-300 underline cursor-pointer font-semibold"
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
