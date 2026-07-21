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
}) => {
  const [isBeltMoving, setIsBeltMoving] = useState(false);

  // Find active cake at each station index
  const getCakeAtStation = (stationIdx: number) => {
    return activeCakes.find((c) => c.currentStationIndex === stationIdx && !c.isScrapped);
  };

  const handleAdvance = () => {
    audioSynth.playConveyorStep();
    setIsBeltMoving(true);
    onAdvanceBelt();
    setTimeout(() => {
      setIsBeltMoving(false);
    }, 600);
  };

  return (
    <div className="relative w-full max-w-6xl flex flex-col items-center select-none my-3">
      {/* Skeuomorphic Vista Gadget Machinery Stations (0-5) */}
      <div className="w-full grid grid-cols-6 gap-3 mb-3 px-2">
        {/* Station 0: Pan Station Gadget (Purple) */}
        <div className="bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900 p-3 rounded-2xl border-3 border-purple-400 shadow-xl flex flex-col items-center justify-between text-center min-h-[150px] relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-300 shadow-[0_0_8px_#c084fc]" />
            <span className="text-xs font-black text-purple-100 tracking-wider uppercase drop-shadow-md">
              0. PAN
            </span>
          </div>
          <div className="flex flex-col gap-1.5 w-full my-1">
            <button
              onClick={() => { audioSynth.playPanDrop(); onSelectShape('square'); }}
              disabled={!!getCakeAtStation(0)?.shape}
              className="skeuo-btn py-1.5 px-2 rounded-xl text-xs font-black text-slate-800 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              ⏹️ Square
            </button>
            <button
              onClick={() => { audioSynth.playPanDrop(); onSelectShape('circle'); }}
              disabled={!!getCakeAtStation(0)?.shape}
              className="skeuo-btn py-1.5 px-2 rounded-xl text-xs font-black text-slate-800 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              ⏺️ Circle
            </button>
            <button
              onClick={() => { audioSynth.playPanDrop(); onSelectShape('heart'); }}
              disabled={!!getCakeAtStation(0)?.shape}
              className="skeuo-btn py-1.5 px-2 rounded-xl text-xs font-black text-slate-800 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              ❤️ Heart
            </button>
          </div>
        </div>

        {/* Station 1: Batter Dispenser Gadget (Red / Crimson) */}
        <div className="bg-gradient-to-b from-rose-700 via-rose-800 to-rose-950 p-3 rounded-2xl border-3 border-rose-400 shadow-xl flex flex-col items-center justify-between text-center min-h-[150px] relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-300 shadow-[0_0_8px_#fda4af]" />
            <span className="text-xs font-black text-rose-100 tracking-wider uppercase drop-shadow-md">
              1. BATTER
            </span>
          </div>
          <div className="flex flex-col gap-1.5 w-full my-1">
            <button
              onClick={() => { audioSynth.playBatterDispense(); onAddBatter('chocolate'); }}
              disabled={!getCakeAtStation(1)}
              className="skeuo-btn py-1.5 px-1.5 rounded-xl text-xs font-black text-amber-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍫 Choco
            </button>
            <button
              onClick={() => { audioSynth.playBatterDispense(); onAddBatter('strawberry'); }}
              disabled={!getCakeAtStation(1)}
              className="skeuo-btn py-1.5 px-1.5 rounded-xl text-xs font-black text-rose-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍓 Straw
            </button>
            <button
              onClick={() => { audioSynth.playBatterDispense(); onAddBatter('vanilla'); }}
              disabled={!getCakeAtStation(1)}
              className="skeuo-btn py-1.5 px-1.5 rounded-xl text-xs font-black text-yellow-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍦 Vanilla
            </button>
          </div>
        </div>

        {/* Station 2: Filling Station Gadget (Light Blue) */}
        <div className="bg-gradient-to-b from-sky-700 via-sky-800 to-sky-950 p-3 rounded-2xl border-3 border-sky-400 shadow-xl flex flex-col items-center justify-between text-center min-h-[150px] relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-300 shadow-[0_0_8px_#7dd3fc]" />
            <span className="text-xs font-black text-sky-100 tracking-wider uppercase drop-shadow-md">
              2. FILLING
            </span>
          </div>
          <div className="flex flex-col gap-1.5 w-full my-1">
            <button
              onClick={() => { audioSynth.playFillingDispense(); onAddFilling('chocolate'); }}
              disabled={!getCakeAtStation(2) || (getCakeAtStation(2)?.layers.length === 0)}
              className="skeuo-btn py-1.5 px-1.5 rounded-xl text-xs font-black text-amber-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍫 Choco
            </button>
            <button
              onClick={() => { audioSynth.playFillingDispense(); onAddFilling('strawberry'); }}
              disabled={!getCakeAtStation(2) || (getCakeAtStation(2)?.layers.length === 0)}
              className="skeuo-btn py-1.5 px-1.5 rounded-xl text-xs font-black text-rose-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍓 Straw
            </button>
            <button
              onClick={() => { audioSynth.playFillingDispense(); onAddFilling('vanilla'); }}
              disabled={!getCakeAtStation(2) || (getCakeAtStation(2)?.layers.length === 0)}
              className="skeuo-btn py-1.5 px-1.5 rounded-xl text-xs font-black text-yellow-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍦 Vanilla
            </button>
          </div>
        </div>

        {/* Station 3: Icing Machine Gadget (Magenta / Pink) */}
        <div className="bg-gradient-to-b from-fuchsia-700 via-fuchsia-800 to-fuchsia-950 p-3 rounded-2xl border-3 border-fuchsia-400 shadow-xl flex flex-col items-center justify-between text-center min-h-[150px] relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-300 shadow-[0_0_8px_#f0abfc]" />
            <span className="text-xs font-black text-fuchsia-100 tracking-wider uppercase drop-shadow-md">
              3. ICING
            </span>
          </div>
          <div className="flex flex-col gap-1.5 w-full my-1">
            <button
              onClick={() => { audioSynth.playIcingDispense(); onAddIcing('chocolate'); }}
              disabled={!getCakeAtStation(3) || (getCakeAtStation(3)?.layers.length === 0)}
              className="skeuo-btn py-1.5 px-1.5 rounded-xl text-xs font-black text-amber-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍫 Choco
            </button>
            <button
              onClick={() => { audioSynth.playIcingDispense(); onAddIcing('strawberry'); }}
              disabled={!getCakeAtStation(3) || (getCakeAtStation(3)?.layers.length === 0)}
              className="skeuo-btn py-1.5 px-1.5 rounded-xl text-xs font-black text-rose-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍓 Straw
            </button>
            <button
              onClick={() => { audioSynth.playIcingDispense(); onAddIcing('vanilla'); }}
              disabled={!getCakeAtStation(3) || (getCakeAtStation(3)?.layers.length === 0)}
              className="skeuo-btn py-1.5 px-1.5 rounded-xl text-xs font-black text-yellow-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍦 Vanilla
            </button>
          </div>
        </div>

        {/* Station 4: Topping Dispenser Gadget (Green) */}
        <div className="bg-gradient-to-b from-emerald-700 via-emerald-800 to-emerald-950 p-3 rounded-2xl border-3 border-emerald-400 shadow-xl flex flex-col items-center justify-between text-center min-h-[150px] relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7]" />
            <span className="text-xs font-black text-emerald-100 tracking-wider uppercase drop-shadow-md">
              4. TOPPING
            </span>
          </div>
          <div className="flex flex-col gap-1 w-full my-1">
            <button
              onClick={() => { audioSynth.playToppingDispense(); onAddTopping('cherry'); }}
              disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
              className="skeuo-btn py-0.5 px-1 rounded-lg text-[11px] font-black text-emerald-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍒 Cherry
            </button>
            <button
              onClick={() => { audioSynth.playToppingDispense(); onAddTopping('gumdrop'); }}
              disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
              className="skeuo-btn py-0.5 px-1 rounded-lg text-[11px] font-black text-emerald-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍬 Gumdrop
            </button>
            <button
              onClick={() => { audioSynth.playToppingDispense(); onAddTopping('clover'); }}
              disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
              className="skeuo-btn py-0.5 px-1 rounded-lg text-[11px] font-black text-emerald-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍀 Clover
            </button>
            <button
              onClick={() => { audioSynth.playToppingDispense(); onAddTopping('powdered_sugar'); }}
              disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
              className="skeuo-btn py-0.5 px-1 rounded-lg text-[11px] font-black text-emerald-950 disabled:opacity-40 flex items-center justify-center gap-1 cursor-pointer"
            >
              ✨ Sugar
            </button>
          </div>
        </div>

        {/* Station 5: Shipping Box & Scrap Gadget (Dark Blue) */}
        <div className="bg-gradient-to-b from-indigo-700 via-indigo-800 to-indigo-950 p-3 rounded-2xl border-3 border-indigo-400 shadow-xl flex flex-col items-center justify-between text-center min-h-[150px] relative overflow-hidden">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-300 shadow-[0_0_8px_#a5b4fc]" />
            <span className="text-xs font-black text-indigo-100 tracking-wider uppercase drop-shadow-md">
              5. SHIPPING
            </span>
          </div>
          <div className="flex flex-col gap-1.5 w-full my-1">
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
            <button
              onClick={() => {
                const c = getCakeAtStation(5) || activeCakes.find((cake) => !cake.isScrapped);
                if (c) onTrashCake(c.id);
              }}
              disabled={!activeCakes.some((cake) => !cake.isScrapped)}
              className="skeuo-btn py-1 px-1 rounded-lg text-[11px] font-black text-rose-950 disabled:opacity-30 flex items-center justify-center gap-1 cursor-pointer"
            >
              🗑️ Scrap Bin
            </button>
          </div>
        </div>
      </div>

      {/* 3D Metal Mesh Conveyor Belt Track */}
      <div className="relative w-full skeuo-card p-4 overflow-hidden">
        {/* Conveyor Rubber & Steel Housing */}
        <div
          className={`relative w-full h-36 metal-mesh-conveyor rounded-2xl border-3 border-slate-600 flex items-center justify-around px-2 overflow-hidden ${
            isBeltMoving ? 'animate-conveyor-active' : ''
          }`}
        >
          {/* 6 Seamless Station Slots (Without "Slot #" Text Labels) */}
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
                    Empty Pan
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Green Vista Start Orb ADVANCE BELT Physical Button */}
        <div className="w-full flex items-center justify-between mt-4 px-3">
          <div className="text-xs font-black text-slate-800 flex items-center gap-2 bg-white/70 px-3 py-1.5 rounded-full border border-white shadow-sm">
            <span className={`w-3 h-3 rounded-full ${isBeltMoving ? 'bg-emerald-500 animate-ping' : 'bg-amber-400'}`} />
            <span>{isBeltMoving ? 'Conveyor Belt Moving...' : 'Belt Ready'}</span>
          </div>

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
