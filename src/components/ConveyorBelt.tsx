import React, { useState } from 'react';
import { ActiveCake, CakeShape, Flavor, Topping } from '../types/game';
import { audioSynth } from '../utils/audioSynth';
import { CakeRenderer } from './CakeRenderer';

interface ConveyorBeltProps {
  activeCakes: ActiveCake[];
  onSelectShape: (shape: CakeShape) => void;
  onAddBatter: (flavor: Flavor) => void;
  onAddFilling: (flavor: Flavor) => void;
  onAddIcing: (flavor: Flavor) => void;
  onAddTopping: (topping: Topping) => void;
  onDeliverCake: (cakeId: string) => void;
  onTrashCake: (cakeId: string) => void;
  onAdvanceBelt: () => void;
  onReturnToBatter?: (cakeId: string) => void;
}

export const ConveyorBelt: React.FC<ConveyorBeltProps> = ({
  activeCakes,
  onSelectShape,
  onAddBatter,
  onAddFilling,
  onAddIcing,
  onAddTopping,
  onDeliverCake,
  onTrashCake,
  onAdvanceBelt,
  onReturnToBatter,
}) => {
  const [isBeltMoving, setIsBeltMoving] = useState(false);
  const [activeDispenser, setActiveDispenser] = useState<number | null>(null);

  // Find active cake at each station index
  const getCakeAtStation = (stationIdx: number) => {
    return activeCakes.find((c) => c.currentStationIndex === stationIdx && !c.isScrapped);
  };

  const triggerDispenseAnimation = (stationIdx: number) => {
    setActiveDispenser(stationIdx);
    setTimeout(() => {
      setActiveDispenser(null);
    }, 550);
  };

  const handleAdvance = () => {
    audioSynth.playConveyorStep();
    setIsBeltMoving(true);
    onAdvanceBelt();
    setTimeout(() => {
      setIsBeltMoving(false);
    }, 650);
  };

  return (
    <div className="relative w-full max-w-6xl flex flex-col items-center select-none my-2">
      {/* 1. TOP ZONE: Ceiling-Mounted Hanging Machine Stations */}
      <div className="w-full grid grid-cols-6 gap-3 mb-1 px-2 items-end">
        {/* Station 0: Pan Dispenser (Leftmost station, below order screen) */}
        <div className="ceiling-machine p-2 rounded-t-2xl flex flex-col items-center justify-between text-center h-28 relative border-b-0">
          <div className="text-[11px] font-black text-purple-950 uppercase tracking-wider">
            PAN DISPENSER
          </div>
          <div className="text-2xl my-1">⚙️</div>
          {/* Hanging Spout */}
          <div className="machine-spout w-10 h-5 rounded-b-lg flex items-center justify-center relative -mb-3 z-10">
            <div className="w-5 h-2 bg-slate-900 rounded-full" />
            {activeDispenser === 0 && (
              <div className="absolute top-5 w-4 bg-slate-400 rounded-b-full animate-pour z-30" />
            )}
          </div>
        </div>

        {/* Station 1: Multi-Tiered Colorful Batter Hopper Machine */}
        <div className="ceiling-machine p-2 rounded-t-2xl flex flex-col items-center justify-between text-center h-28 relative border-b-0 bg-gradient-to-b from-rose-200 via-amber-200 to-rose-300">
          <div className="text-[11px] font-black text-rose-950 uppercase tracking-wider">
            BATTER HOPPER
          </div>
          <div className="flex gap-1.5 my-1">
            <div className="w-3 h-5 rounded-t bg-amber-900 border border-amber-950" title="Chocolate" />
            <div className="w-3 h-5 rounded-t bg-yellow-200 border border-yellow-400" title="Vanilla" />
            <div className="w-3 h-5 rounded-t bg-pink-400 border border-pink-600" title="Strawberry" />
          </div>
          {/* Triple Spouts */}
          <div className="machine-spout w-12 h-5 rounded-b-lg flex items-center justify-around relative -mb-3 z-10">
            <div className="w-2.5 h-2 bg-amber-950 rounded-full" />
            <div className="w-2.5 h-2 bg-yellow-400 rounded-full" />
            <div className="w-2.5 h-2 bg-pink-600 rounded-full" />
            {activeDispenser === 1 && (
              <div className="absolute top-5 w-4 bg-amber-700 rounded-b-full animate-pour z-30" />
            )}
          </div>
        </div>

        {/* Station 2: Filling Machine Funnel */}
        <div className="ceiling-machine p-2 rounded-t-2xl flex flex-col items-center justify-between text-center h-28 relative border-b-0 bg-gradient-to-b from-sky-200 via-cyan-200 to-sky-300">
          <div className="text-[11px] font-black text-sky-950 uppercase tracking-wider">
            FILLING FUNNEL
          </div>
          <div className="text-2xl my-1">🏺</div>
          {/* Funnel Spout */}
          <div className="machine-spout w-10 h-5 rounded-b-lg flex items-center justify-center relative -mb-3 z-10">
            <div className="w-4 h-2 bg-sky-900 rounded-full" />
            {activeDispenser === 2 && (
              <div className="absolute top-5 w-3.5 bg-pink-400 rounded-b-full animate-pour z-30" />
            )}
          </div>
        </div>

        {/* Station 3: Striped Peppermint Icing Nozzles */}
        <div className="ceiling-machine p-2 rounded-t-2xl flex flex-col items-center justify-between text-center h-28 relative border-b-0 bg-gradient-to-b from-fuchsia-200 via-rose-200 to-fuchsia-300">
          <div className="text-[11px] font-black text-fuchsia-950 uppercase tracking-wider">
            ICING NOZZLE
          </div>
          <div className="text-2xl my-1">🍬</div>
          {/* Peppermint Piping Nozzle */}
          <div className="machine-spout w-10 h-5 rounded-b-lg flex items-center justify-center relative -mb-3 z-10 bg-gradient-to-r from-red-400 via-white to-red-400">
            <div className="w-4 h-2 bg-white rounded-full border border-red-500" />
            {activeDispenser === 3 && (
              <div className="absolute top-5 w-4 bg-white rounded-b-full animate-pour z-30 border-x border-red-400" />
            )}
          </div>
        </div>

        {/* Station 4: Topping Glass Bowl Apparatus */}
        <div className="ceiling-machine p-2 rounded-t-2xl flex flex-col items-center justify-between text-center h-28 relative border-b-0 bg-gradient-to-b from-emerald-200 via-teal-200 to-emerald-300">
          <div className="text-[11px] font-black text-emerald-950 uppercase tracking-wider">
            TOPPING BOWL
          </div>
          <div className="text-2xl my-1">🔮</div>
          {/* Glass Bowl Outlet */}
          <div className="machine-spout w-10 h-5 rounded-b-lg flex items-center justify-center relative -mb-3 z-10">
            <div className="w-4 h-2 bg-emerald-900 rounded-full" />
          </div>
        </div>

        {/* Station 5: Shipping Box Station & Right Trash Bin Anchor */}
        <div className="ceiling-machine p-2 rounded-t-2xl flex flex-col items-center justify-between text-center h-28 relative border-b-0 bg-gradient-to-b from-indigo-200 via-blue-200 to-indigo-300">
          <div className="text-[11px] font-black text-indigo-950 uppercase tracking-wider">
            SHIPPING
          </div>
          <div className="text-2xl my-1">📦</div>
          {/* Chute */}
          <div className="machine-spout w-10 h-5 rounded-b-lg flex items-center justify-center relative -mb-3 z-10">
            <div className="w-4 h-2 bg-indigo-900 rounded-full" />
          </div>
        </div>
      </div>

      {/* 2. MIDDLE ZONE: Wide Gray Metallic Segmented Conveyor Belt & Cylindrical Trash Bin */}
      <div className="relative w-full flex items-center gap-3 my-1">
        {/* Segmented Metallic Belt */}
        <div className="relative flex-1 skeuo-card p-3 overflow-hidden">
          <div
            className={`relative w-full h-36 segmented-metal-conveyor rounded-2xl border-3 border-slate-700 flex items-center justify-around px-2 overflow-hidden ${
              isBeltMoving ? 'animate-conveyor-active' : ''
            }`}
          >
            {/* 6 Stations along belt (No slot labels) */}
            {[0, 1, 2, 3, 4, 5].map((slotIdx) => {
              const cakeAtSlot = getCakeAtStation(slotIdx);

              return (
                <div
                  key={slotIdx}
                  className="relative flex-1 h-full flex flex-col items-center justify-center border-r border-slate-700/60 last:border-r-0 px-1"
                >
                  {/* Steel Roller Gears */}
                  <div className="absolute bottom-1.5 w-12 h-3.5 bg-slate-800 rounded-full border border-slate-600 flex items-center justify-between px-1 shadow-md">
                    <div className={`w-2 h-2 rounded-full bg-slate-400 ${isBeltMoving ? 'animate-spin' : ''}`} />
                    <div className={`w-2 h-2 rounded-full bg-slate-400 ${isBeltMoving ? 'animate-spin' : ''}`} />
                  </div>

                  {/* Active Cake sitting on conveyor */}
                  {cakeAtSlot ? (
                    <div className="z-20 transform hover:scale-105 transition-transform duration-200">
                      <CakeRenderer cake={cakeAtSlot} scale={0.9} />
                    </div>
                  ) : (
                    <div className="w-24 h-16 border-2 border-dashed border-slate-600/50 rounded-xl flex items-center justify-center text-[10px] font-extrabold text-slate-400/80">
                      Empty Slot
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Cylindrical Metallic Trash Bin at Far Right End */}
        <div className="relative flex flex-col items-center justify-end h-44 w-24">
          <button
            onClick={() => {
              const c = getCakeAtStation(5) || activeCakes.find((cake) => !cake.isScrapped);
              if (c) onTrashCake(c.id);
            }}
            disabled={!activeCakes.some((cake) => !cake.isScrapped)}
            className="w-full h-full bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 border-4 border-slate-700 rounded-b-3xl rounded-t-xl shadow-2xl flex flex-col items-center justify-between p-2 disabled:opacity-40 hover:brightness-110 cursor-pointer"
            title="Dump mis-made cake into trash bin"
          >
            {/* Metallic Bin Lid Rim */}
            <div className="w-full h-5 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 rounded-t-lg border-b-2 border-slate-600 flex items-center justify-center shadow">
              <div className="w-8 h-1 bg-slate-700 rounded-full" />
            </div>

            <div className="text-2xl animate-bounce my-1">🗑️</div>
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter text-center">
              TRASH BIN
            </span>
          </button>
        </div>
      </div>

      {/* 3. BOTTOM ZONE: White Tiled Counter Panel housing physical push-buttons */}
      <div className="w-full white-tile-counter p-4 rounded-2xl border-2 border-slate-300 shadow-xl my-2">
        <div className="w-full grid grid-cols-6 gap-3 items-start text-center">
          {/* Pan Controls (3 vertical buttons: Circle, Square, Heart) */}
          <div className="flex flex-col gap-1.5 items-center">
            <span className="text-[11px] font-black text-purple-950 uppercase">Pan Shape</span>
            <button
              onClick={() => { triggerDispenseAnimation(0); onSelectShape('square'); }}
              disabled={!!getCakeAtStation(0)?.shape}
              className="counter-square-btn w-full py-1.5 rounded-xl text-xs font-black text-slate-900 cursor-pointer disabled:opacity-40"
            >
              ⏹️ Square
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(0); onSelectShape('circle'); }}
              disabled={!!getCakeAtStation(0)?.shape}
              className="counter-square-btn w-full py-1.5 rounded-xl text-xs font-black text-slate-900 cursor-pointer disabled:opacity-40"
            >
              ⏺️ Circle
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(0); onSelectShape('heart'); }}
              disabled={!!getCakeAtStation(0)?.shape}
              className="counter-square-btn w-full py-1.5 rounded-xl text-xs font-black text-slate-900 cursor-pointer disabled:opacity-40"
            >
              ❤️ Heart
            </button>
          </div>

          {/* Batter Controls (3 vertical buttons: Chocolate, Vanilla, Strawberry) */}
          <div className="flex flex-col gap-1.5 items-center">
            <span className="text-[11px] font-black text-rose-950 uppercase">Batter Flavor</span>
            <button
              onClick={() => { triggerDispenseAnimation(1); onAddBatter('chocolate'); }}
              disabled={!getCakeAtStation(1)}
              className="counter-square-btn w-full py-1.5 rounded-xl text-xs font-black text-amber-950 cursor-pointer disabled:opacity-40"
            >
              🍫 Choco
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(1); onAddBatter('vanilla'); }}
              disabled={!getCakeAtStation(1)}
              className="counter-square-btn w-full py-1.5 rounded-xl text-xs font-black text-yellow-950 cursor-pointer disabled:opacity-40"
            >
              🍦 Vanilla
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(1); onAddBatter('strawberry'); }}
              disabled={!getCakeAtStation(1)}
              className="counter-square-btn w-full py-1.5 rounded-xl text-xs font-black text-rose-950 cursor-pointer disabled:opacity-40"
            >
              🍓 Straw
            </button>
          </div>

          {/* Filling Controls (3 vertical buttons) */}
          <div className="flex flex-col gap-1.5 items-center">
            <span className="text-[11px] font-black text-sky-950 uppercase">Filling Cream</span>
            <button
              onClick={() => { triggerDispenseAnimation(2); onAddFilling('chocolate'); }}
              disabled={!getCakeAtStation(2) || (getCakeAtStation(2)?.layers.length === 0)}
              className="counter-square-btn w-full py-1.5 rounded-xl text-xs font-black text-amber-950 cursor-pointer disabled:opacity-40"
            >
              🍫 Choco
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(2); onAddFilling('vanilla'); }}
              disabled={!getCakeAtStation(2) || (getCakeAtStation(2)?.layers.length === 0)}
              className="counter-square-btn w-full py-1.5 rounded-xl text-xs font-black text-yellow-950 cursor-pointer disabled:opacity-40"
            >
              🍦 Vanilla
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(2); onAddFilling('strawberry'); }}
              disabled={!getCakeAtStation(2) || (getCakeAtStation(2)?.layers.length === 0)}
              className="counter-square-btn w-full py-1.5 rounded-xl text-xs font-black text-rose-950 cursor-pointer disabled:opacity-40"
            >
              🍓 Straw
            </button>
          </div>

          {/* Icing Controls (3 vertical buttons) */}
          <div className="flex flex-col gap-1.5 items-center">
            <span className="text-[11px] font-black text-fuchsia-950 uppercase">Top Icing</span>
            <button
              onClick={() => { triggerDispenseAnimation(3); onAddIcing('chocolate'); }}
              disabled={!getCakeAtStation(3) || (getCakeAtStation(3)?.layers.length === 0)}
              className="counter-square-btn w-full py-1.5 rounded-xl text-xs font-black text-amber-950 cursor-pointer disabled:opacity-40"
            >
              🍫 Choco
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(3); onAddIcing('vanilla'); }}
              disabled={!getCakeAtStation(3) || (getCakeAtStation(3)?.layers.length === 0)}
              className="counter-square-btn w-full py-1.5 rounded-xl text-xs font-black text-yellow-950 cursor-pointer disabled:opacity-40"
            >
              🍦 Vanilla
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(3); onAddIcing('strawberry'); }}
              disabled={!getCakeAtStation(3) || (getCakeAtStation(3)?.layers.length === 0)}
              className="counter-square-btn w-full py-1.5 rounded-xl text-xs font-black text-rose-950 cursor-pointer disabled:opacity-40"
            >
              🍓 Straw
            </button>
          </div>

          {/* Topping Controls (2x2 grid of buttons: Gumdrop, Heart, Smile, Clover) */}
          <div className="flex flex-col gap-1 items-center">
            <span className="text-[11px] font-black text-emerald-950 uppercase">Garnish Toppings</span>
            <div className="grid grid-cols-2 gap-1 w-full">
              <button
                onClick={() => { triggerDispenseAnimation(4); onAddTopping('cherry'); }}
                disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
                className="counter-square-btn py-1 rounded-lg text-[11px] font-black text-slate-900 cursor-pointer disabled:opacity-40"
              >
                🍒 Cherry
              </button>
              <button
                onClick={() => { triggerDispenseAnimation(4); onAddTopping('gumdrop'); }}
                disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
                className="counter-square-btn py-1 rounded-lg text-[11px] font-black text-slate-900 cursor-pointer disabled:opacity-40"
              >
                🍬 Gumdrop
              </button>
              <button
                onClick={() => { triggerDispenseAnimation(4); onAddTopping('clover'); }}
                disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
                className="counter-square-btn py-1 rounded-lg text-[11px] font-black text-slate-900 cursor-pointer disabled:opacity-40"
              >
                🍀 Clover
              </button>
              <button
                onClick={() => { triggerDispenseAnimation(4); onAddTopping('powdered_sugar'); }}
                disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
                className="counter-square-btn py-1 rounded-lg text-[11px] font-black text-slate-900 cursor-pointer disabled:opacity-40"
              >
                ✨ Sugar
              </button>
            </div>
          </div>

          {/* Shipping & Return Controls */}
          <div className="flex flex-col gap-1.5 items-center">
            <span className="text-[11px] font-black text-indigo-950 uppercase">Shipping Box</span>
            <button
              onClick={() => {
                const c = getCakeAtStation(5);
                if (c) onDeliverCake(c.id);
              }}
              disabled={!getCakeAtStation(5)}
              className="counter-square-btn w-full py-2 rounded-xl text-xs font-black text-emerald-950 bg-gradient-to-b from-emerald-300 to-emerald-500 hover:from-emerald-200 hover:to-emerald-400 cursor-pointer disabled:opacity-40 shadow-md animate-pulse"
            >
              📦 SHIP CAKE!
            </button>
            {onReturnToBatter && (
              <button
                onClick={() => {
                  const c = getCakeAtStation(5) || getCakeAtStation(4) || getCakeAtStation(3);
                  if (c) onReturnToBatter(c.id);
                }}
                disabled={!activeCakes.some((c) => !c.isScrapped)}
                className="counter-square-btn w-full py-1 rounded-lg text-[10px] font-black text-purple-950 bg-gradient-to-b from-purple-200 to-purple-400 cursor-pointer disabled:opacity-30"
              >
                🔁 Next Layer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. LOWER FLOOR ZONE: Checkered Floor with 2 Glowing Green Round Advance Buttons */}
      <div className="w-full checkered-floor p-4 rounded-2xl flex items-center justify-between shadow-2xl border-2 border-slate-700">
        <div className="flex items-center gap-3 bg-white/90 px-4 py-2 rounded-full border border-slate-300 shadow-md">
          <span className={`w-3.5 h-3.5 rounded-full ${isBeltMoving ? 'bg-emerald-500 animate-ping' : 'bg-amber-400'}`} />
          <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
            {isBeltMoving ? 'CONVEYOR BELT MOVING...' : 'BELT READY'}
          </span>
        </div>

        {/* Two Large Glowing Green Round Buttons set into white base */}
        <div className="bg-white p-2.5 rounded-full border-4 border-slate-300 shadow-xl flex items-center gap-4">
          <button
            onClick={handleAdvance}
            className="floor-green-orb w-16 h-16 rounded-full text-white font-black text-xl shadow-2xl flex items-center justify-center cursor-pointer"
            title="Step Belt Forward"
          >
            ◀️
          </button>
          <button
            onClick={handleAdvance}
            className="floor-green-orb w-20 h-20 rounded-full text-white font-black text-2xl shadow-2xl flex items-center justify-center cursor-pointer"
            title="ADVANCE CONVEYOR BELT"
          >
            ⏩
          </button>
        </div>
      </div>
    </div>
  );
};
