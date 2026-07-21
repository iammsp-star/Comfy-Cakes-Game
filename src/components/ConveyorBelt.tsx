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
    <div className="relative w-full max-w-6xl flex flex-col items-center select-none my-3">
      {/* Physical Industrial Dispenser Machines Mounted Above Conveyor Line (0-5) */}
      <div className="w-full grid grid-cols-6 gap-3 mb-2 px-2">
        {/* Station 0: Metallic Pan Dropper Machine */}
        <div className="dispenser-machine p-2.5 rounded-2xl flex flex-col items-center justify-between text-center min-h-[160px] relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
            <span className="text-xs font-black text-purple-950 uppercase tracking-wider">
              PAN DROPPER
            </span>
          </div>

          <div className="flex flex-col gap-1.5 w-full my-1 z-10">
            <button
              onClick={() => { triggerDispenseAnimation(0); onSelectShape('square'); }}
              disabled={!!getCakeAtStation(0)?.shape}
              className="skeuo-btn py-1 px-2 rounded-xl text-xs font-black text-slate-800 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              ⏹️ Square
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(0); onSelectShape('circle'); }}
              disabled={!!getCakeAtStation(0)?.shape}
              className="skeuo-btn py-1 px-2 rounded-xl text-xs font-black text-slate-800 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              ⏺️ Circle
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(0); onSelectShape('heart'); }}
              disabled={!!getCakeAtStation(0)?.shape}
              className="skeuo-btn py-1 px-2 rounded-xl text-xs font-black text-slate-800 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              ❤️ Heart
            </button>
          </div>

          {/* Machine Mechanical Spout Nozzle */}
          <div className="machine-spout w-8 h-4 rounded-b-md flex items-center justify-center -mb-2 relative">
            <div className="w-4 h-1.5 bg-slate-900 rounded-full" />
          </div>
        </div>

        {/* Station 1: Industrial Batter Injector Machine */}
        <div className="dispenser-machine p-2.5 rounded-2xl flex flex-col items-center justify-between text-center min-h-[160px] relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
            <span className="text-xs font-black text-rose-950 uppercase tracking-wider">
              BATTER SPOUT
            </span>
          </div>

          <div className="flex flex-col gap-1.5 w-full my-1 z-10">
            <button
              onClick={() => { triggerDispenseAnimation(1); onAddBatter('chocolate'); }}
              disabled={!getCakeAtStation(1)}
              className="skeuo-btn py-1 px-1.5 rounded-xl text-xs font-black text-amber-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍫 Choco
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(1); onAddBatter('strawberry'); }}
              disabled={!getCakeAtStation(1)}
              className="skeuo-btn py-1 px-1.5 rounded-xl text-xs font-black text-rose-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍓 Straw
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(1); onAddBatter('vanilla'); }}
              disabled={!getCakeAtStation(1)}
              className="skeuo-btn py-1 px-1.5 rounded-xl text-xs font-black text-yellow-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍦 Vanilla
            </button>
          </div>

          {/* Batter Spout Nozzle & Animated Stream */}
          <div className="machine-spout w-8 h-4 rounded-b-md flex items-center justify-center -mb-2 relative">
            <div className="w-4 h-1.5 bg-rose-900 rounded-full" />
            {activeDispenser === 1 && (
              <div className="absolute top-4 w-3 bg-gradient-to-b from-amber-700 via-amber-500 to-amber-800 rounded-b-full animate-pour z-30" />
            )}
          </div>
        </div>

        {/* Station 2: Cream Filling Injector Machine */}
        <div className="dispenser-machine p-2.5 rounded-2xl flex flex-col items-center justify-between text-center min-h-[160px] relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_8px_#0284c7]" />
            <span className="text-xs font-black text-sky-950 uppercase tracking-wider">
              CREAM FILLING
            </span>
          </div>

          <div className="flex flex-col gap-1.5 w-full my-1 z-10">
            <button
              onClick={() => { triggerDispenseAnimation(2); onAddFilling('chocolate'); }}
              disabled={!getCakeAtStation(2) || (getCakeAtStation(2)?.layers.length === 0)}
              className="skeuo-btn py-1 px-1.5 rounded-xl text-xs font-black text-amber-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍫 Choco
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(2); onAddFilling('strawberry'); }}
              disabled={!getCakeAtStation(2) || (getCakeAtStation(2)?.layers.length === 0)}
              className="skeuo-btn py-1 px-1.5 rounded-xl text-xs font-black text-rose-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍓 Straw
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(2); onAddFilling('vanilla'); }}
              disabled={!getCakeAtStation(2) || (getCakeAtStation(2)?.layers.length === 0)}
              className="skeuo-btn py-1 px-1.5 rounded-xl text-xs font-black text-yellow-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍦 Vanilla
            </button>
          </div>

          {/* Filling Injector Spout */}
          <div className="machine-spout w-8 h-4 rounded-b-md flex items-center justify-center -mb-2 relative">
            <div className="w-4 h-1.5 bg-sky-900 rounded-full" />
            {activeDispenser === 2 && (
              <div className="absolute top-4 w-3 bg-gradient-to-b from-pink-300 via-pink-400 to-pink-500 rounded-b-full animate-pour z-30" />
            )}
          </div>
        </div>

        {/* Station 3: Top Icing Piping Machine */}
        <div className="dispenser-machine p-2.5 rounded-2xl flex flex-col items-center justify-between text-center min-h-[160px] relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shadow-[0_0_8px_#d946ef]" />
            <span className="text-xs font-black text-fuchsia-950 uppercase tracking-wider">
              ICING PIPING
            </span>
          </div>

          <div className="flex flex-col gap-1.5 w-full my-1 z-10">
            <button
              onClick={() => { triggerDispenseAnimation(3); onAddIcing('chocolate'); }}
              disabled={!getCakeAtStation(3) || (getCakeAtStation(3)?.layers.length === 0)}
              className="skeuo-btn py-1 px-1.5 rounded-xl text-xs font-black text-amber-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍫 Choco
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(3); onAddIcing('strawberry'); }}
              disabled={!getCakeAtStation(3) || (getCakeAtStation(3)?.layers.length === 0)}
              className="skeuo-btn py-1 px-1.5 rounded-xl text-xs font-black text-rose-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍓 Straw
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(3); onAddIcing('vanilla'); }}
              disabled={!getCakeAtStation(3) || (getCakeAtStation(3)?.layers.length === 0)}
              className="skeuo-btn py-1 px-1.5 rounded-xl text-xs font-black text-yellow-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍦 Vanilla
            </button>
          </div>

          {/* Icing Piping Nozzle */}
          <div className="machine-spout w-8 h-4 rounded-b-md flex items-center justify-center -mb-2 relative">
            <div className="w-4 h-1.5 bg-fuchsia-900 rounded-full" />
            {activeDispenser === 3 && (
              <div className="absolute top-4 w-3.5 bg-gradient-to-b from-white via-pink-200 to-white rounded-b-full animate-pour z-30" />
            )}
          </div>
        </div>

        {/* Station 4: Garnish Topping Shaker Machine */}
        <div className="dispenser-machine p-2.5 rounded-2xl flex flex-col items-center justify-between text-center min-h-[160px] relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <span className="text-xs font-black text-emerald-950 uppercase tracking-wider">
              TOPPING SHAKER
            </span>
          </div>

          <div className="flex flex-col gap-1 w-full my-1 z-10">
            <button
              onClick={() => { triggerDispenseAnimation(4); onAddTopping('cherry'); }}
              disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
              className="skeuo-btn py-0.5 px-1 rounded-lg text-[11px] font-black text-emerald-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍒 Cherry
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(4); onAddTopping('gumdrop'); }}
              disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
              className="skeuo-btn py-0.5 px-1 rounded-lg text-[11px] font-black text-emerald-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍬 Gumdrop
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(4); onAddTopping('clover'); }}
              disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
              className="skeuo-btn py-0.5 px-1 rounded-lg text-[11px] font-black text-emerald-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍀 Clover
            </button>
            <button
              onClick={() => { triggerDispenseAnimation(4); onAddTopping('powdered_sugar'); }}
              disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
              className="skeuo-btn py-0.5 px-1 rounded-lg text-[11px] font-black text-emerald-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              ✨ Sugar
            </button>
          </div>

          {/* Shaker Nozzle */}
          <div className="machine-spout w-8 h-4 rounded-b-md flex items-center justify-center -mb-2 relative">
            <div className="w-4 h-1.5 bg-emerald-900 rounded-full" />
          </div>
        </div>

        {/* Station 5: Quality Inspection & Shipping Box */}
        <div className="dispenser-machine p-2.5 rounded-2xl flex flex-col items-center justify-between text-center min-h-[160px] relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
            <span className="text-xs font-black text-indigo-950 uppercase tracking-wider">
              SHIPPING BOX
            </span>
          </div>

          <div className="flex flex-col gap-1.5 w-full my-1 z-10">
            <button
              onClick={() => {
                const c = getCakeAtStation(5);
                if (c) onDeliverCake(c.id);
              }}
              disabled={!getCakeAtStation(5)}
              className="skeuo-btn py-2 px-1 rounded-xl text-xs font-black text-emerald-900 bg-gradient-to-b from-emerald-300 to-emerald-500 hover:from-emerald-200 hover:to-emerald-400 disabled:opacity-40 shadow-lg flex items-center justify-center gap-1 cursor-pointer animate-pulse"
            >
              📦 SHIP!
            </button>

            {/* Multi-layer Loop Return Belt Button */}
            {onReturnToBatter && (
              <button
                onClick={() => {
                  const c = getCakeAtStation(5) || getCakeAtStation(4) || getCakeAtStation(3);
                  if (c) onReturnToBatter(c.id);
                }}
                disabled={!activeCakes.some((c) => !c.isScrapped)}
                className="skeuo-btn py-1 px-1 rounded-lg text-[10px] font-black text-purple-950 bg-gradient-to-b from-purple-200 to-purple-400 disabled:opacity-30 flex items-center justify-center gap-0.5 cursor-pointer"
                title="Send cake back to Station 1 to stack next layer!"
              >
                🔁 Add Next Layer
              </button>
            )}
          </div>

          {/* Shipping Chute */}
          <div className="machine-spout w-8 h-4 rounded-b-md flex items-center justify-center -mb-2 relative">
            <div className="w-4 h-1.5 bg-indigo-900 rounded-full" />
          </div>
        </div>
      </div>

      {/* Continuous 3D Metal Mesh Conveyor Belt Track spanning bottom */}
      <div className="relative w-full skeuo-card p-4 overflow-hidden">
        {/* Conveyor Steel Mesh Track */}
        <div
          className={`relative w-full h-36 metal-mesh-conveyor rounded-2xl border-3 border-slate-600 flex items-center justify-around px-2 overflow-hidden ${
            isBeltMoving ? 'animate-conveyor-active' : ''
          }`}
        >
          {/* 6 Seamless Station Slots (Without any SLOT # labels) */}
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

                {/* Cake Sitting on Slot */}
                {cakeAtSlot ? (
                  <div className="z-20 transform hover:scale-105 transition-transform duration-200">
                    <CakeRenderer cake={cakeAtSlot} scale={0.9} />
                  </div>
                ) : (
                  <div className="w-24 h-16 border-2 border-dashed border-slate-600/60 rounded-xl flex items-center justify-center text-[11px] font-bold text-slate-400/80">
                    Empty Belt
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Mechanics Bar: Open Trash Bin + Green ADVANCE Belt Lever */}
        <div className="w-full flex items-center justify-between mt-4 px-3">
          {/* Open Trash / Scrap Bin at belt end */}
          <button
            onClick={() => {
              const c = getCakeAtStation(5) || activeCakes.find((cake) => !cake.isScrapped);
              if (c) onTrashCake(c.id);
            }}
            disabled={!activeCakes.some((cake) => !cake.isScrapped)}
            className="skeuo-btn py-2 px-4 rounded-2xl bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 hover:from-rose-100 hover:to-rose-300 disabled:opacity-40 text-rose-950 font-black text-xs shadow-md border-2 border-rose-400 flex items-center gap-2 cursor-pointer"
          >
            <span className="text-lg">🗑️</span>
            <span>OPEN TRASH BIN (SCRAP CAKE)</span>
          </button>

          {/* Prominent Green Vista Start Orb ADVANCE BELT Lever / Button */}
          <button
            onClick={handleAdvance}
            className="vista-orb-btn py-3 px-8 rounded-full text-white font-black text-base shadow-2xl flex items-center gap-3 cursor-pointer"
          >
            <span className="text-xl">🟢</span>
            <span>ADVANCE BELT</span>
            <span className="text-xl">⏩</span>
          </button>
        </div>
      </div>
    </div>
  );
};
