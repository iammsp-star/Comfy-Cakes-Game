import React from 'react';
import { ActiveCake, CakeShape, CakeSpec, Flavor, Topping } from '../types/game';

interface CakeRendererProps {
  cake: Partial<CakeSpec> | ActiveCake;
  scale?: number;
  showShadow?: boolean;
  isSquashing?: boolean;
}

const FLAVOR_COLORS: Record<Flavor, { main: string; dark: string; light: string; crumb: string }> = {
  chocolate: { main: '#5c3a21', dark: '#3b2211', light: '#7c5333', crumb: '#4a2c17' },
  strawberry: { main: '#ff6b8b', dark: '#d94364', light: '#ff94aa', crumb: '#e84d73' },
  vanilla: { main: '#f3e5ab', dark: '#e2cc78', light: '#fff4ca', crumb: '#ded093' },
};

const ICING_COLORS: Record<Flavor, { main: string; gloss: string; drip: string }> = {
  chocolate: { main: '#4a2c17', gloss: '#6d4529', drip: '#381f0e' },
  strawberry: { main: '#ff4d73', gloss: '#ff809b', drip: '#e6395e' },
  vanilla: { main: '#ffffff', gloss: '#fff9e6', drip: '#f3ebd4' },
};

export const CakeRenderer: React.FC<CakeRendererProps> = ({
  cake,
  scale = 1,
  showShadow = true,
  isSquashing = false,
}) => {
  const { shape, layers = [], icing, topping } = cake;

  if (!shape && layers.length === 0) {
    return (
      <div
        className="w-28 h-20 border-2 border-dashed border-slate-400/50 rounded-xl flex items-center justify-center text-xs text-slate-400 font-bold select-none"
        style={{ transform: `scale(${scale})` }}
      >
        Empty Slot
      </div>
    );
  }

  const getPanShapeClass = (s?: CakeShape) => {
    switch (s) {
      case 'square':
        return 'rounded-xl';
      case 'circle':
        return 'rounded-full';
      case 'heart':
        return 'clip-heart';
      default:
        return 'rounded-xl';
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-end select-none ${
        isSquashing ? 'animate-cake-squash' : ''
      }`}
      style={{
        width: 140 * scale,
        height: 120 * scale,
        transformOrigin: 'bottom center',
      }}
    >
      {/* Conveyor Floor Shadow with Dynamic Squish */}
      {showShadow && (
        <div
          className={`absolute -bottom-2.5 w-32 h-6 bg-slate-950/30 rounded-full blur-xs transition-transform duration-200 ${
            isSquashing ? 'scale-x-125 scale-y-50' : ''
          }`}
          style={{ transform: 'scaleY(0.4)' }}
        />
      )}

      {/* 2.5D Stack Container */}
      <div className="relative flex flex-col items-center justify-end w-full h-full pb-2">
        {/* Metal Cake Pan (Station 0) */}
        {shape && (
          <div
            className={`relative w-28 h-10 border-4 border-slate-300 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-500 shadow-lg ${getPanShapeClass(
              shape
            )} transition-all duration-300 flex items-center justify-center overflow-hidden z-0`}
            style={{
              boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.8), 0 6px 14px rgba(0,0,0,0.35)',
            }}
          >
            {/* Metal rim sheen */}
            <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* Empty Pan Label Texture if no batter yet */}
            {layers.length === 0 && (
              <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest opacity-80 filter drop-shadow">
                {shape} Pan
              </div>
            )}
          </div>
        )}

        {/* Stacked Batter & Filling Layers */}
        {layers.map((layer, idx) => {
          const colors = FLAVOR_COLORS[layer.batter] || FLAVOR_COLORS.vanilla;
          const fillingColors = layer.filling ? FLAVOR_COLORS[layer.filling] : null;

          const layerWidth = Math.max(70, 100 - idx * 8);
          const bottomOffset = 8 + idx * 14;

          return (
            <div
              key={idx}
              className={`absolute transition-all duration-300 ${getPanShapeClass(shape)} shadow-md overflow-hidden`}
              style={{
                width: `${layerWidth}px`,
                height: '24px',
                bottom: `${bottomOffset}px`,
                backgroundColor: colors.main,
                backgroundImage: `linear-gradient(to bottom, ${colors.light} 0%, ${colors.main} 55%, ${colors.dark} 100%)`,
                boxShadow: '0 3px 6px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.5)',
                border: `1.5px solid ${colors.dark}`,
                zIndex: 10 + idx,
              }}
            >
              {/* Organic Crumb Texture */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:6px_6px]" />

              {/* Hand-Decorated Top Batter Rim Curve */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 opacity-60"
                style={{ backgroundColor: colors.light }}
              />

              {/* Filling Band if present */}
              {layer.filling && fillingColors && (
                <div
                  className="absolute top-1/2 left-0 right-0 h-2.5 -translate-y-1/2 rounded-xs opacity-95 shadow-inner flex items-center justify-around overflow-hidden"
                  style={{
                    backgroundColor: fillingColors.main,
                    borderTop: `1.5px solid ${fillingColors.light}`,
                    borderBottom: `1.5px solid ${fillingColors.dark}`,
                  }}
                >
                  {/* Organic Filling Cream Swirl Highlights */}
                  <div
                    className="w-full h-full opacity-40"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${fillingColors.light} 25%, transparent 25%, transparent 50%, ${fillingColors.light} 50%, ${fillingColors.light} 75%, transparent 75%)`,
                      backgroundSize: '12px 100%',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Hand-Decorated Top Icing Layer (Station 3) */}
        {icing && layers.length > 0 && (
          <div
            className={`absolute transition-all duration-300 ${getPanShapeClass(shape)} shadow-lg overflow-visible`}
            style={{
              width: `${Math.max(68, 102 - (layers.length - 1) * 8)}px`,
              height: '18px',
              bottom: `${8 + (layers.length - 1) * 14 + 13}px`,
              backgroundColor: ICING_COLORS[icing].main,
              boxShadow: `0 4px 8px rgba(0,0,0,0.25), inset 0 3px 5px ${ICING_COLORS[icing].gloss}`,
              border: `1.5px solid ${ICING_COLORS[icing].drip}`,
              zIndex: 25,
            }}
          >
            {/* Glossy Soft Highlight */}
            <div className="absolute top-0.5 left-2 right-2 h-2 bg-white/50 rounded-full blur-[0.5px]" />

            {/* Hand-Dripped Scalloped Soft Wave Bottom Edge */}
            <div className="absolute -bottom-2 left-0 right-0 flex justify-around pointer-events-none">
              <div
                className="w-3 h-3 rounded-full shadow-xs"
                style={{ backgroundColor: ICING_COLORS[icing].main }}
              />
              <div
                className="w-4 h-4 rounded-full -mt-0.5 shadow-xs"
                style={{ backgroundColor: ICING_COLORS[icing].main }}
              />
              <div
                className="w-3.5 h-3.5 rounded-full shadow-xs"
                style={{ backgroundColor: ICING_COLORS[icing].main }}
              />
              <div
                className="w-2.5 h-2.5 rounded-full shadow-xs"
                style={{ backgroundColor: ICING_COLORS[icing].main }}
              />
            </div>
          </div>
        )}

        {/* Topping Overlay (Station 4) */}
        {topping && layers.length > 0 && (
          <div
            className="absolute flex items-center justify-center gap-1.5 z-30 transition-all duration-300 animate-liquid-splat"
            style={{
              bottom: `${8 + (layers.length - 1) * 14 + (icing ? 24 : 18)}px`,
            }}
          >
            {topping === 'cherry' && (
              <div className="flex gap-2 items-center">
                <span className="text-2xl filter drop-shadow-md transform -rotate-12 hover:scale-115 transition-transform">
                  🍒
                </span>
                <span className="text-2xl filter drop-shadow-md transform rotate-12 hover:scale-115 transition-transform">
                  🍒
                </span>
              </div>
            )}

            {topping === 'gumdrop' && (
              <div className="flex gap-1.5 items-center filter drop-shadow-md">
                <div className="w-4.5 h-4.5 rounded-t-full bg-gradient-to-b from-red-400 via-red-500 to-red-700 border border-red-300 relative shadow-inner">
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/80 rounded-full" />
                </div>
                <div className="w-5 h-5 rounded-t-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-700 border border-emerald-300 relative shadow-inner">
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/80 rounded-full" />
                </div>
                <div className="w-4.5 h-4.5 rounded-t-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 border border-amber-200 relative shadow-inner">
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/80 rounded-full" />
                </div>
              </div>
            )}

            {topping === 'clover' && (
              <div className="flex gap-2 items-center filter drop-shadow-md">
                <span className="text-xl text-emerald-600 transform hover:scale-115 transition-transform">
                  🍀
                </span>
                <span className="text-xl text-emerald-600 transform rotate-45 hover:scale-115 transition-transform">
                  🍀
                </span>
              </div>
            )}

            {topping === 'powdered_sugar' && (
              <div className="w-24 h-7 relative overflow-hidden pointer-events-none filter drop-shadow">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff_2px,transparent_2px)] [background-size:6px_6px] opacity-95 blur-[0.4px]" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
