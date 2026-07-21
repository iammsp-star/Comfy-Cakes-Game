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
    <div className="relative flex items-end justify-center gap-4 py-2 px-4 select-none">
      {/* Animated Chef Purble Avatar */}
      <div className="relative flex flex-col items-center group">
        {/* Speech Bubble */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-slate-800 text-xs font-bold py-1 px-3 rounded-full shadow-lg border-2 border-purple-400 whitespace-nowrap animate-bounce">
          {chefExpression === 'happy' && 'Yummy! Great Job! 🎉'}
          {chefExpression === 'surprised' && 'Oh no! Oops! 😮'}
          {chefExpression === 'idle' && 'Bake this cake! 🎂'}
        </div>

        {/* Chef Purble Character */}
        <div className="relative w-20 h-24 flex flex-col items-center justify-end">
          {/* Chef Hat */}
          <div className="w-12 h-10 bg-white rounded-t-2xl border-2 border-slate-300 shadow-md relative overflow-hidden flex items-center justify-center z-10">
            <div className="w-full h-2 bg-purple-500/20 absolute bottom-0" />
            <div className="w-6 h-6 rounded-full bg-white border border-slate-200 absolute -top-3" />
          </div>

          {/* Purble Face */}
          <div className="relative w-16 h-14 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full border-2 border-purple-700 shadow-lg flex flex-col items-center justify-center -mt-3">
            {/* Eyes */}
            <div className="flex gap-3 mb-1">
              {chefExpression === 'happy' ? (
                <>
                  <div className="text-sm font-bold text-yellow-300">^</div>
                  <div className="text-sm font-bold text-yellow-300">^</div>
                </>
              ) : chefExpression === 'surprised' ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                  </div>
                  <div className="w-3 h-3 rounded-full bg-white flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                  </div>
                  <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                  </div>
                </>
              )}
            </div>

            {/* Nose */}
            <div className="w-2.5 h-2 rounded-full bg-pink-400 border border-purple-800" />

            {/* Mouth */}
            <div className="mt-1">
              {chefExpression === 'happy' ? (
                <div className="w-5 h-2.5 border-b-3 border-yellow-300 rounded-b-full bg-red-400" />
              ) : chefExpression === 'surprised' ? (
                <div className="w-3 h-3 rounded-full bg-slate-900 border border-purple-800" />
              ) : (
                <div className="w-4 h-1.5 border-b-2 border-slate-900 rounded-b-full" />
              )}
            </div>

            {/* Chef Apron / Bow */}
            <div className="absolute -bottom-2 w-10 h-4 bg-pink-500 rounded-t-md border border-purple-800 flex items-center justify-center">
              <div className="w-2 h-2 bg-yellow-300 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Overhead TV Display */}
      <div className="relative bg-gradient-to-b from-amber-800 via-amber-900 to-amber-950 p-3 rounded-2xl border-4 border-amber-700 shadow-2xl flex items-center gap-4 max-w-lg">
        {/* Antenna */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none">
          <div className="w-1 h-7 bg-amber-600 transform -rotate-25 origin-bottom rounded-full" />
          <div className="w-1 h-7 bg-amber-600 transform rotate-25 origin-bottom rounded-full" />
        </div>

        {/* TV Screen Container */}
        <div className="relative bg-gradient-to-b from-cyan-950 via-slate-900 to-cyan-900 border-4 border-slate-700 rounded-xl p-3 shadow-inner flex items-center gap-4 overflow-hidden">
          {/* CRT Scanline Glow Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

          {/* Mini 2.5D Target Cake Preview */}
          <div className="relative flex items-center justify-center p-2 bg-slate-800/80 rounded-lg border border-cyan-500/30 min-w-[120px] min-h-[100px]">
            <CakeRenderer cake={order} scale={0.7} showShadow={false} />
          </div>

          {/* Order Details Specification Sheet */}
          <div className="flex flex-col text-cyan-100 text-xs font-semibold space-y-1">
            <div className="text-amber-400 font-extrabold text-sm tracking-wide uppercase border-b border-cyan-700/50 pb-0.5 flex items-center gap-1">
              <span>ORDER #{order.id.substring(6)}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400">Shape:</span>
              <span className="capitalize text-white bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-700">
                {order.shape}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400">Layers ({order.layers.length}):</span>
              <div className="flex flex-wrap gap-1">
                {order.layers.map((l, i) => (
                  <span
                    key={i}
                    className="capitalize text-white bg-slate-800 px-1 py-0.5 rounded text-[10px] border border-cyan-800"
                  >
                    L{i + 1}: {l.batter}
                    {l.filling ? ` (${l.filling})` : ''}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400">Icing:</span>
              <span className="capitalize text-white">
                {order.icing ? order.icing : 'None'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400">Topping:</span>
              <span className="capitalize text-white">
                {order.topping ? order.topping.replace('_', ' ') : 'None'}
              </span>
            </div>
          </div>
        </div>

        {/* TV Knobs / Speaker Grille */}
        <div className="flex flex-col items-center justify-center gap-2 px-1">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-900 to-amber-600 border border-amber-500 shadow-md flex items-center justify-center cursor-pointer hover:rotate-45 transition-transform">
            <div className="w-1 h-3 bg-amber-300 rounded-full" />
          </div>
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-900 to-amber-600 border border-amber-500 shadow-md flex items-center justify-center cursor-pointer hover:rotate-90 transition-transform">
            <div className="w-1 h-3 bg-amber-300 rounded-full" />
          </div>
          {/* Speaker slots */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="w-6 h-0.5 bg-amber-950 rounded-full" />
            <div className="w-6 h-0.5 bg-amber-950 rounded-full" />
            <div className="w-6 h-0.5 bg-amber-950 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
