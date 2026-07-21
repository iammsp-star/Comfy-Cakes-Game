import React from 'react';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-gradient-to-b from-purple-900 via-slate-900 to-purple-950 max-w-lg w-full p-6 rounded-3xl border-4 border-purple-500 shadow-2xl flex flex-col text-left">
        <h2 className="text-2xl font-black text-amber-300 font-['Fredoka'] mb-2 flex items-center gap-2">
          <span>📖</span> How to Play Comfy Cakes
        </h2>

        <div className="space-y-3 text-xs text-purple-100 max-h-[60vh] overflow-y-auto pr-2 my-2">
          <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-800/50">
            <h3 className="font-bold text-cyan-300 text-sm mb-1">1. Fulfill the Order on the TV Screen</h3>
            <p>Look at the overhead TV display. Chef Purble shows you the target cake shape, layer count, batter flavors, filling, icing, and toppings required!</p>
          </div>

          <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-800/50">
            <h3 className="font-bold text-cyan-300 text-sm mb-1">2. Operate Conveyor Stations Step-by-Step</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><strong className="text-white">Station 0 (Pan):</strong> Dispense a Square, Circle, or Heart pan.</li>
              <li><strong className="text-white">Station 1 (Batter):</strong> Add Chocolate, Strawberry, or Vanilla batter.</li>
              <li><strong className="text-white">Station 2 (Filling):</strong> Add cream filling between layers.</li>
              <li><strong className="text-white">Station 3 (Icing):</strong> Pipe icing on top of the cake.</li>
              <li><strong className="text-white">Station 4 (Topping):</strong> Add cherries, gumdrops, clovers, or sugar.</li>
              <li><strong className="text-white">Station 5 (Shipping):</strong> Click <strong>SHIP!</strong> to validate against the TV order!</li>
            </ul>
          </div>

          <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-800/50">
            <h3 className="font-bold text-rose-300 text-sm mb-1">3. Trash Ruined Cakes</h3>
            <p>Made a mistake? Click the <strong>🗑️ Scrap Bin</strong> button to toss ruined cakes before shipping so you don't lose one of your 3 lives!</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm shadow-lg transition-all cursor-pointer text-center"
        >
          Got it! Let's Bake! 🍰
        </button>
      </div>
    </div>
  );
};
