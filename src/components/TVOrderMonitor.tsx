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
    <div className="w-full flex items-start justify-between py-1 px-4 select-none mb-2">
      {/* Top-Left: Light Blue Square CRT Television & Purble Baker Mascot */}
      <div className="flex items-center gap-4">
        {/* Light Blue Square CRT TV Monitor */}
        <div className="relative blue-crt-tv p-3 rounded-2xl flex items-center gap-3 max-w-md">
          {/* Dual Metallic Antennae */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-6 pointer-events-none">
            <div className="w-1.5 h-8 bg-gradient-to-t from-slate-400 to-slate-200 transform -rotate-25 origin-bottom rounded-full shadow-md" />
            <div className="w-1.5 h-8 bg-gradient-to-t from-slate-400 to-slate-200 transform rotate-25 origin-bottom rounded-full shadow-md" />
          </div>

          {/* CRT Screen Frame */}
          <div className="relative crt-screen p-2.5 rounded-xl flex items-center gap-3 overflow-hidden">
            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-30" />

            {/* 3D Visual Render Preview of Target Cake */}
            <div className="relative flex items-center justify-center p-2.5 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg border border-amber-300 shadow-md min-w-[120px] min-h-[105px]">
              <CakeRenderer cake={order} scale={0.7} showShadow={false} />
            </div>

            {/* Order Specification Receipt Text */}
            <div className="flex flex-col text-slate-950 font-black text-xs space-y-0.5 bg-amber-50/90 p-2.5 rounded-md border border-amber-300 shadow-xs min-w-[170px]">
              <div className="text-sky-950 font-black text-xs uppercase border-b-2 border-amber-300 pb-0.5">
                BAKERY TARGET CAKE
              </div>

              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-slate-900 font-black">Shape:</span>
                <span className="capitalize text-sky-950 font-bold bg-amber-200 px-1.5 py-0.2 rounded border border-amber-400">
                  {order.shape}
                </span>
              </div>

              <div className="flex items-start gap-1">
                <span className="text-slate-900 font-black">Layers:</span>
                <div className="flex flex-col gap-0.2">
                  {order.layers.map((l, i) => (
                    <span key={i} className="capitalize text-slate-900 font-bold text-[10px]">
                      L{i + 1}: {l.batter} {l.filling ? `(${l.filling})` : ''}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-slate-900 font-black">Icing:</span>
                <span className="capitalize text-slate-900 font-bold">
                  {order.icing ? order.icing : 'None'}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-slate-900 font-black">Topping:</span>
                <span className="capitalize text-slate-900 font-bold">
                  {order.topping ? order.topping.replace('_', ' ') : 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* TV Chrome Control Knobs */}
          <div className="flex flex-col items-center justify-center gap-2 px-0.5">
            <div className="w-5 h-5 rounded-full bg-slate-300 border border-slate-600 shadow flex items-center justify-center cursor-pointer hover:rotate-45 transition-transform">
              <div className="w-0.5 h-2.5 bg-slate-900 rounded-full" />
            </div>
            <div className="w-5 h-5 rounded-full bg-slate-300 border border-slate-600 shadow flex items-center justify-center cursor-pointer hover:rotate-90 transition-transform">
              <div className="w-0.5 h-2.5 bg-slate-900 rounded-full" />
            </div>
          </div>
        </div>

        {/* Purble Chef 3D Mascot Character standing next to TV */}
        <div className="relative flex flex-col items-center group animate-mascot-idle">
          {/* Speech Bubble */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[11px] font-black py-1 px-3 rounded-2xl shadow-lg border-2 border-purple-500 whitespace-nowrap animate-bounce z-30">
            {chefExpression === 'happy' && '🎉 Yummy! Perfect! 🎉'}
            {chefExpression === 'surprised' && '😮 Oops! Wrong Cake! 😮'}
            {chefExpression === 'idle' && '👨‍🍳 Bake This Order! 🎂'}
          </div>

          {/* 3D Mascot Image */}
          <div className="relative w-24 h-28 flex items-center justify-center filter drop-shadow-xl">
            <img
              src="./purble_chef.png"
              alt="Purble Chef Mascot"
              className="w-full h-full object-contain relative z-10 transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
