import React from 'react';
import { CakeSpec } from '../types/game';
import { CakeRenderer } from './CakeRenderer';

interface TVOrderMonitorProps {
  order: CakeSpec;
  chefExpression?: 'idle' | 'happy' | 'surprised';
}

export const TVOrderMonitor: React.FC<TVOrderMonitorProps> = ({
  order,
  chefExpression = 'idle',
}) => {
  return (
    <div className="relative flex items-end justify-center gap-6 py-2 px-4 select-none my-2">
      {/* Authentic 3D Rendered Purble Chef Mascot standing to left of TV */}
      <div className="relative flex flex-col items-center group animate-mascot-idle">
        {/* Speech Bubble */}
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gradient-to-b from-white to-amber-100 text-slate-900 text-xs font-black py-1.5 px-4 rounded-2xl shadow-xl border-3 border-purple-500 whitespace-nowrap animate-bounce z-30">
          {chefExpression === 'happy' && '🎉 Yummy! Perfect Cake! 🎉'}
          {chefExpression === 'surprised' && '😮 Oh no! Wrong Order! 😮'}
          {chefExpression === 'idle' && '👨‍🍳 Bake This Cake! 🎂'}
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-purple-500" />
        </div>

        {/* Purble Chef 3D Mascot Image & Glow */}
        <div className="relative w-28 h-32 flex items-center justify-center filter drop-shadow-2xl">
          <div className="absolute inset-0 bg-purple-400/30 rounded-full blur-xl animate-pulse" />
          <img
            src="./purble_chef.png"
            alt="Purble Chef Mascot"
            className="w-full h-full object-contain relative z-10 transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* 1950s Retro Purple CRT Television Mounted Above Playfield */}
      <div className="relative bg-gradient-to-b from-purple-800 via-purple-900 to-purple-950 p-4 rounded-3xl border-4 border-purple-600 shadow-2xl flex items-center gap-4 max-w-xl">
        {/* Dual Metallic Antennae */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-8 pointer-events-none">
          <div className="w-1.5 h-10 bg-gradient-to-t from-slate-400 to-slate-200 transform -rotate-30 origin-bottom rounded-full shadow-md" />
          <div className="w-1.5 h-10 bg-gradient-to-t from-slate-400 to-slate-200 transform rotate-30 origin-bottom rounded-full shadow-md" />
        </div>

        {/* CRT Screen Display Box */}
        <div className="relative crt-screen p-3 rounded-2xl flex items-center gap-4 overflow-hidden border-4 border-amber-900/60 shadow-inner">
          {/* CRT Scanline Curvature Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-30" />

          {/* Mini 2.5D Target Cake Display */}
          <div className="relative flex items-center justify-center p-3 bg-gradient-to-b from-amber-100 to-amber-200 rounded-xl border-2 border-amber-400 shadow-md min-w-[130px] min-h-[110px]">
            <CakeRenderer cake={order} scale={0.75} showShadow={false} />
          </div>

          {/* Bold Black Text Ingredient Receipt Card (Without Modern Tags) */}
          <div className="flex flex-col text-black font-extrabold text-xs space-y-1 bg-amber-50 p-3 rounded-lg border border-amber-300 shadow-sm min-w-[210px]">
            <div className="text-purple-950 font-black text-sm tracking-wider uppercase border-b-2 border-amber-300 pb-1 flex items-center justify-between">
              <span>BAKERY CAKE ORDER</span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-black font-black">Shape:</span>
              <span className="capitalize text-black font-black bg-amber-200 px-2 py-0.5 rounded border border-amber-400">
                {order.shape}
              </span>
            </div>

            <div className="flex items-start gap-1.5">
              <span className="text-black font-black">Layers ({order.layers.length}):</span>
              <div className="flex flex-col gap-0.5">
                {order.layers.map((l, i) => (
                  <span
                    key={i}
                    className="capitalize text-black font-black text-[11px]"
                  >
                    • L{i + 1}: {l.batter} {l.filling ? `+ ${l.filling}` : ''}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-black font-black">Icing:</span>
              <span className="capitalize text-black font-black">
                {order.icing ? order.icing : 'None'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-black font-black">Topping:</span>
              <span className="capitalize text-black font-black">
                {order.topping ? order.topping.replace('_', ' ') : 'None'}
              </span>
            </div>
          </div>
        </div>

        {/* Retro TV Chrome Knobs & Speaker Grille */}
        <div className="flex flex-col items-center justify-center gap-3 px-1">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-700 via-slate-400 to-slate-200 border-2 border-slate-800 shadow-md flex items-center justify-center cursor-pointer hover:rotate-45 transition-transform">
            <div className="w-1 h-3 bg-slate-900 rounded-full" />
          </div>
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-700 via-slate-400 to-slate-200 border-2 border-slate-800 shadow-md flex items-center justify-center cursor-pointer hover:rotate-90 transition-transform">
            <div className="w-1 h-3 bg-slate-900 rounded-full" />
          </div>
          {/* Speaker Slits */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="w-7 h-1 bg-purple-950 rounded-full shadow-inner" />
            <div className="w-7 h-1 bg-purple-950 rounded-full shadow-inner" />
            <div className="w-7 h-1 bg-purple-950 rounded-full shadow-inner" />
          </div>
        </div>
      </div>
    </div>
  );
};
