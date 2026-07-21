import React from 'react';
import { ActiveCake, CakeShape, Flavor, Topping } from '../types/game';
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

const STATIONS = [
  { index: 0, title: 'Pan Station', subtitle: 'Shape Dispenser' },
  { index: 1, title: 'Batter Station', subtitle: 'Flavor Dispenser' },
  { index: 2, title: 'Filling Station', subtitle: 'Cream Dispenser' },
  { index: 3, title: 'Icing Station', subtitle: 'Top Piping' },
  { index: 4, title: 'Topping Station', subtitle: 'Garnish Dispenser' },
  { index: 5, title: 'Delivery Box', subtitle: 'Quality Check' },
];

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
  // Find active cake at each station index
  const getCakeAtStation = (stationIdx: number) => {
    return activeCakes.find((c) => c.currentStationIndex === stationIdx && !c.isScrapped);
  };

  return (
    <div className="relative w-full max-w-6xl flex flex-col items-center select-none my-4">
      {/* Upper Machinery Station Controls */}
      <div className="w-full grid grid-cols-6 gap-2 mb-2 px-4">
        {/* Station 0: Shape Selector Machine */}
        <div className="bg-gradient-to-b from-purple-800 to-purple-950 p-2.5 rounded-t-2xl border-2 border-purple-600 shadow-lg flex flex-col items-center justify-between text-center min-h-[140px]">
          <div className="text-xs font-bold text-purple-200 tracking-wider uppercase">0. PAN</div>
          <div className="flex flex-col gap-1.5 w-full my-1">
            <button
              onClick={() => onSelectShape('square')}
              disabled={!!getCakeAtStation(0)?.shape}
              className="py-1 px-2 rounded-lg bg-slate-700 hover:bg-purple-600 disabled:opacity-40 text-xs font-bold text-white shadow-md transition-all active:scale-95 border border-purple-400/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>⏹️</span> Square
            </button>
            <button
              onClick={() => onSelectShape('circle')}
              disabled={!!getCakeAtStation(0)?.shape}
              className="py-1 px-2 rounded-lg bg-slate-700 hover:bg-purple-600 disabled:opacity-40 text-xs font-bold text-white shadow-md transition-all active:scale-95 border border-purple-400/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>⏺️</span> Circle
            </button>
            <button
              onClick={() => onSelectShape('heart')}
              disabled={!!getCakeAtStation(0)?.shape}
              className="py-1 px-2 rounded-lg bg-slate-700 hover:bg-purple-600 disabled:opacity-40 text-xs font-bold text-white shadow-md transition-all active:scale-95 border border-purple-400/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>❤️</span> Heart
            </button>
          </div>
        </div>

        {/* Station 1: Batter Dispenser Machine */}
        <div className="bg-gradient-to-b from-amber-800 to-amber-950 p-2.5 rounded-t-2xl border-2 border-amber-600 shadow-lg flex flex-col items-center justify-between text-center min-h-[140px]">
          <div className="text-xs font-bold text-amber-200 tracking-wider uppercase">1. BATTER</div>
          <div className="flex flex-col gap-1.5 w-full my-1">
            <button
              onClick={() => onAddBatter('chocolate')}
              disabled={!getCakeAtStation(1)}
              className="py-1 px-1.5 rounded-lg bg-amber-900 hover:bg-amber-700 disabled:opacity-40 text-xs font-bold text-amber-100 shadow-md transition-all active:scale-95 border border-amber-500/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍫 Choco
            </button>
            <button
              onClick={() => onAddBatter('strawberry')}
              disabled={!getCakeAtStation(1)}
              className="py-1 px-1.5 rounded-lg bg-pink-800 hover:bg-pink-600 disabled:opacity-40 text-xs font-bold text-pink-100 shadow-md transition-all active:scale-95 border border-pink-400/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍓 Straw
            </button>
            <button
              onClick={() => onAddBatter('vanilla')}
              disabled={!getCakeAtStation(1)}
              className="py-1 px-1.5 rounded-lg bg-yellow-700 hover:bg-yellow-500 disabled:opacity-40 text-xs font-bold text-yellow-100 shadow-md transition-all active:scale-95 border border-yellow-400/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍦 Vanilla
            </button>
          </div>
        </div>

        {/* Station 2: Filling Dispenser Machine */}
        <div className="bg-gradient-to-b from-blue-800 to-blue-950 p-2.5 rounded-t-2xl border-2 border-blue-600 shadow-lg flex flex-col items-center justify-between text-center min-h-[140px]">
          <div className="text-xs font-bold text-blue-200 tracking-wider uppercase">2. FILLING</div>
          <div className="flex flex-col gap-1.5 w-full my-1">
            <button
              onClick={() => onAddFilling('chocolate')}
              disabled={!getCakeAtStation(2) || (getCakeAtStation(2)?.layers.length === 0)}
              className="py-1 px-1.5 rounded-lg bg-amber-900 hover:bg-blue-600 disabled:opacity-40 text-xs font-bold text-blue-100 shadow-md transition-all active:scale-95 border border-blue-400/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍫 Choco
            </button>
            <button
              onClick={() => onAddFilling('strawberry')}
              disabled={!getCakeAtStation(2) || (getCakeAtStation(2)?.layers.length === 0)}
              className="py-1 px-1.5 rounded-lg bg-pink-800 hover:bg-blue-600 disabled:opacity-40 text-xs font-bold text-blue-100 shadow-md transition-all active:scale-95 border border-blue-400/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍓 Straw
            </button>
            <button
              onClick={() => onAddFilling('vanilla')}
              disabled={!getCakeAtStation(2) || (getCakeAtStation(2)?.layers.length === 0)}
              className="py-1 px-1.5 rounded-lg bg-yellow-700 hover:bg-blue-600 disabled:opacity-40 text-xs font-bold text-blue-100 shadow-md transition-all active:scale-95 border border-blue-400/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍦 Vanilla
            </button>
          </div>
        </div>

        {/* Station 3: Icing Piping Machine */}
        <div className="bg-gradient-to-b from-rose-800 to-rose-950 p-2.5 rounded-t-2xl border-2 border-rose-600 shadow-lg flex flex-col items-center justify-between text-center min-h-[140px]">
          <div className="text-xs font-bold text-rose-200 tracking-wider uppercase">3. ICING</div>
          <div className="flex flex-col gap-1.5 w-full my-1">
            <button
              onClick={() => onAddIcing('chocolate')}
              disabled={!getCakeAtStation(3) || (getCakeAtStation(3)?.layers.length === 0)}
              className="py-1 px-1.5 rounded-lg bg-amber-900 hover:bg-rose-600 disabled:opacity-40 text-xs font-bold text-rose-100 shadow-md transition-all active:scale-95 border border-rose-400/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍫 Choco
            </button>
            <button
              onClick={() => onAddIcing('strawberry')}
              disabled={!getCakeAtStation(3) || (getCakeAtStation(3)?.layers.length === 0)}
              className="py-1 px-1.5 rounded-lg bg-pink-800 hover:bg-rose-600 disabled:opacity-40 text-xs font-bold text-rose-100 shadow-md transition-all active:scale-95 border border-rose-400/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍓 Straw
            </button>
            <button
              onClick={() => onAddIcing('vanilla')}
              disabled={!getCakeAtStation(3) || (getCakeAtStation(3)?.layers.length === 0)}
              className="py-1 px-1.5 rounded-lg bg-yellow-700 hover:bg-rose-600 disabled:opacity-40 text-xs font-bold text-rose-100 shadow-md transition-all active:scale-95 border border-rose-400/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              🍦 Vanilla
            </button>
          </div>
        </div>

        {/* Station 4: Topping Machine */}
        <div className="bg-gradient-to-b from-emerald-800 to-emerald-950 p-2.5 rounded-t-2xl border-2 border-emerald-600 shadow-lg flex flex-col items-center justify-between text-center min-h-[140px]">
          <div className="text-xs font-bold text-emerald-200 tracking-wider uppercase">4. TOPPING</div>
          <div className="flex flex-col gap-1 w-full my-1">
            <button
              onClick={() => onAddTopping('cherry')}
              disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
              className="py-0.5 px-1 rounded bg-slate-800 hover:bg-emerald-600 disabled:opacity-40 text-[11px] font-bold text-white shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              🍒 Cherry
            </button>
            <button
              onClick={() => onAddTopping('gumdrop')}
              disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
              className="py-0.5 px-1 rounded bg-slate-800 hover:bg-emerald-600 disabled:opacity-40 text-[11px] font-bold text-white shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              🍬 Gumdrop
            </button>
            <button
              onClick={() => onAddTopping('clover')}
              disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
              className="py-0.5 px-1 rounded bg-slate-800 hover:bg-emerald-600 disabled:opacity-40 text-[11px] font-bold text-white shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              🍀 Clover
            </button>
            <button
              onClick={() => onAddTopping('powdered_sugar')}
              disabled={!getCakeAtStation(4) || (getCakeAtStation(4)?.layers.length === 0)}
              className="py-0.5 px-1 rounded bg-slate-800 hover:bg-emerald-600 disabled:opacity-40 text-[11px] font-bold text-white shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              ✨ Sugar
            </button>
          </div>
        </div>

        {/* Station 5: Quality Check / Shipping Box & Trash */}
        <div className="bg-gradient-to-b from-indigo-800 to-indigo-950 p-2.5 rounded-t-2xl border-2 border-indigo-600 shadow-lg flex flex-col items-center justify-between text-center min-h-[140px]">
          <div className="text-xs font-bold text-indigo-200 tracking-wider uppercase">5. SHIPPING</div>
          <div className="flex flex-col gap-1.5 w-full my-1">
            <button
              onClick={() => {
                const c = getCakeAtStation(5);
                if (c) onDeliverCake(c.id);
              }}
              disabled={!getCakeAtStation(5)}
              className="py-2 px-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-xs font-extrabold text-white shadow-lg transition-all active:scale-95 border-2 border-emerald-300 flex items-center justify-center gap-1 cursor-pointer animate-pulse"
            >
              📦 SHIP!
            </button>
            {/* Dedicated Scrap Trash Bin */}
            <button
              onClick={() => {
                // Find cake at station 5 or any active cake selected
                const c = getCakeAtStation(5) || activeCakes.find((cake) => !cake.isScrapped);
                if (c) onTrashCake(c.id);
              }}
              disabled={!activeCakes.some((cake) => !cake.isScrapped)}
              className="py-1 px-1 rounded-lg bg-rose-700 hover:bg-rose-600 disabled:opacity-30 text-[11px] font-bold text-white shadow-md transition-all active:scale-95 border border-rose-400/30 flex items-center justify-center gap-1 cursor-pointer"
            >
              🗑️ Scrap Bin
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Animated Conveyor Belt Base */}
      <div className="relative w-full bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-4 rounded-3xl border-4 border-slate-600 shadow-2xl overflow-hidden">
        {/* Conveyor Belt Rubber Track & Rollers */}
        <div className="relative w-full h-36 bg-slate-950 rounded-2xl border-2 border-slate-700 flex items-center justify-around px-2 shadow-inner overflow-hidden">
          {/* Moving Stripe Pattern Background */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_20px,rgba(255,255,255,0.05)_20px,rgba(255,255,255,0.05)_40px)] bg-[length:40px_100%] animate-[moveStripes_2s_linear_infinite]" />

          {/* 6 Station Slots */}
          {STATIONS.map((st) => {
            const cakeAtSlot = getCakeAtStation(st.index);

            return (
              <div
                key={st.index}
                className="relative flex-1 h-full flex flex-col items-center justify-center border-r border-slate-800/80 last:border-r-0 px-1"
              >
                {/* Station Marker Slot */}
                <div className="absolute top-2 text-[10px] font-bold text-cyan-400/70 uppercase tracking-wider">
                  Slot #{st.index}
                </div>

                {/* Roller Gears Visual */}
                <div className="absolute bottom-1 w-12 h-3 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-between px-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-spin" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-spin" />
                </div>

                {/* Active Cake sitting on slot */}
                {cakeAtSlot ? (
                  <div className="z-20 transform hover:scale-105 transition-transform">
                    <CakeRenderer cake={cakeAtSlot} scale={0.9} />
                  </div>
                ) : (
                  <div className="w-24 h-16 border border-dashed border-slate-700 rounded-xl flex items-center justify-center text-[11px] font-semibold text-slate-600">
                    Empty
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Manual Belt Advance Control Button */}
        <div className="w-full flex items-center justify-between mt-3 px-2">
          <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            Conveyor Belt Running...
          </div>

          <button
            onClick={onAdvanceBelt}
            className="py-2 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl border-2 border-cyan-300 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>⏩ ADVANCE BELT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
