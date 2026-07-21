import React from 'react';
import { ActiveCake, CakeShape, CakeSpec, Flavor, Topping } from '../types/game';

interface CakeRendererProps {
  cake: Partial<CakeSpec> | ActiveCake;
  scale?: number;
  showShadow?: boolean;
}

const FLAVOR_COLORS: Record<Flavor, { main: string; dark: string; light: string }> = {
  chocolate: { main: '#5c3a21', dark: '#3b2211', light: '#7c5333' },
  strawberry: { main: '#ff6b8b', dark: '#d94364', light: '#ff94aa' },
  vanilla: { main: '#f3e5ab', dark: '#e2cc78', light: '#fff4ca' },
};

const ICING_COLORS: Record<Flavor, { main: string; gloss: string }> = {
  chocolate: { main: '#4a2c17', gloss: '#6d4529' },
  strawberry: { main: '#ff4d73', gloss: '#ff809b' },
  vanilla: { main: '#ffffff', gloss: '#fff9e6' },
};

export const CakeRenderer: React.FC<CakeRendererProps> = ({
  cake,
  scale = 1,
  showShadow = true,
}) => {
  const { shape, layers = [], icing, topping } = cake;

  if (!shape && layers.length === 0) {
    return (
      <div
        className="w-28 h-20 border-2 border-dashed border-gray-400/50 rounded-xl flex items-center justify-center text-xs text-gray-400 select-none"
        style={{ transform: `scale(${scale})` }}
      >
        Empty Slot
      </div>
    );
  }

  // Width / Height based on shape
  const getPanShapeClass = (s?: CakeShape) => {
    switch (s) {
      case 'square':
        return 'rounded-xl';
      case 'circle':
        return 'rounded-full';
      case 'heart':
        return 'clip-heart'; // fallback rounded shape + SVG clipping if needed
      default:
        return 'rounded-xl';
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-end select-none"
      style={{
        width: 140 * scale,
        height: 120 * scale,
        transformOrigin: 'bottom center',
      }}
    >
      {/* Conveyor Shadow */}
      {showShadow && (
        <div
          className="absolute -bottom-2 w-32 h-6 bg-black/20 rounded-full blur-xs"
          style={{ transform: 'scaleY(0.4)' }}
        />
      )}

      {/* 2.5D Stack Container */}
      <div className="relative flex flex-col items-center justify-end w-full h-full pb-2">
        {/* Metal Cake Pan (Station 0) */}
        {shape && (
          <div
            className={`relative w-28 h-10 border-4 border-slate-300 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-500 shadow-md ${getPanShapeClass(
              shape
            )} transition-all duration-300 flex items-center justify-center overflow-hidden`}
            style={{
              boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.7), 0 4px 10px rgba(0,0,0,0.3)',
            }}
          >
            {/* Metal rim sheen */}
            <div className="absolute top-0 w-full h-1 bg-white/60" />

            {/* Empty Pan Texture if no batter yet */}
            {layers.length === 0 && (
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest opacity-70">
                {shape} Pan
              </div>
            )}
          </div>
        )}

        {/* Stacked Batter & Filling Layers */}
        {layers.map((layer, idx) => {
          const colors = FLAVOR_COLORS[layer.batter] || FLAVOR_COLORS.vanilla;
          const fillingColors = layer.filling ? FLAVOR_COLORS[layer.filling] : null;

          // Bottom layer sits inside/above pan, upper layers stack upwards with scale offset
          const layerWidth = Math.max(70, 100 - idx * 8);
          const bottomOffset = 8 + idx * 14;

          return (
            <div
              key={idx}
              className={`absolute transition-all duration-300 ${getPanShapeClass(shape)} shadow-sm`}
              style={{
                width: `${layerWidth}px`,
                height: '22px',
                bottom: `${bottomOffset}px`,
                backgroundColor: colors.main,
                backgroundImage: `linear-gradient(to bottom, ${colors.light}, ${colors.main} 60%, ${colors.dark})`,
                boxShadow: '0 2px 4px rgba(0,0,0,0.25), inset 0 2px 3px rgba(255,255,255,0.4)',
                border: `1px solid ${colors.dark}`,
                zIndex: 10 + idx,
              }}
            >
              {/* Layer texture dots */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />

              {/* Filling Band if present */}
              {layer.filling && fillingColors && (
                <div
                  className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 rounded-xs opacity-90 shadow-inner"
                  style={{
                    backgroundColor: fillingColors.main,
                    borderTop: `1px solid ${fillingColors.light}`,
                    borderBottom: `1px solid ${fillingColors.dark}`,
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Top Icing Layer (Station 3) */}
        {icing && layers.length > 0 && (
          <div
            className={`absolute transition-all duration-300 ${getPanShapeClass(shape)} shadow-md`}
            style={{
              width: `${Math.max(68, 102 - (layers.length - 1) * 8)}px`,
              height: '16px',
              bottom: `${8 + (layers.length - 1) * 14 + 12}px`,
              backgroundColor: ICING_COLORS[icing].main,
              boxShadow: `0 3px 6px rgba(0,0,0,0.2), inset 0 3px 4px ${ICING_COLORS[icing].gloss}`,
              border: '1.5px solid rgba(0,0,0,0.15)',
              zIndex: 25,
            }}
          >
            {/* Glossy icing drip effect */}
            <div className="absolute top-0 left-2 right-2 h-2 bg-white/40 rounded-full blur-[1px]" />
          </div>
        )}

        {/* Topping Overlay (Station 4) */}
        {topping && layers.length > 0 && (
          <div
            className="absolute flex items-center justify-center gap-1 z-30 transition-all duration-300"
            style={{
              bottom: `${8 + (layers.length - 1) * 14 + (icing ? 22 : 16)}px`,
            }}
          >
            {topping === 'cherry' && (
              <div className="flex gap-2 items-center">
                <span className="text-xl filter drop-shadow-md transform -rotate-12 hover:scale-110 transition-transform">
                  🍒
                </span>
                <span className="text-xl filter drop-shadow-md transform rotate-12 hover:scale-110 transition-transform">
                  🍒
                </span>
              </div>
            )}

            {topping === 'gumdrop' && (
              <div className="flex gap-1.5 items-center">
                <div className="w-4 h-4 rounded-t-full bg-gradient-to-b from-red-400 to-red-600 shadow-md border border-red-300 relative">
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/70 rounded-full" />
                </div>
                <div className="w-4.5 h-4.5 rounded-t-full bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-md border border-emerald-300 relative">
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/70 rounded-full" />
                </div>
                <div className="w-4 h-4 rounded-t-full bg-gradient-to-b from-amber-400 to-amber-600 shadow-md border border-amber-300 relative">
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/70 rounded-full" />
                </div>
              </div>
            )}

            {topping === 'clover' && (
              <div className="flex gap-2 items-center">
                <span className="text-lg filter drop-shadow-md text-emerald-600 transform hover:scale-110 transition-transform">
                  🍀
                </span>
                <span className="text-lg filter drop-shadow-md text-emerald-600 transform rotate-45 hover:scale-110 transition-transform">
                  🍀
                </span>
              </div>
            )}

            {topping === 'powdered_sugar' && (
              <div className="w-20 h-6 relative overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff_1.5px,transparent_1.5px)] [background-size:6px_6px] opacity-90 blur-[0.5px]" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
