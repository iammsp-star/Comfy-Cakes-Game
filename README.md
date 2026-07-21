# 🎂 Comfy Cakes Game

A modern, high-fidelity web recreation of the iconic **Purble Place: Comfy Cakes** bakery game from Windows Vista. Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Web Audio API**.

---

## 🌟 Features

- 🍰 **Interactive Conveyor Bakery Line**: 6 processing stations (Pan Dispenser, Batter Station, Filling Station, Icing Station, Topping Station, and Delivery Quality Check).
- 📺 **TV Order Monitor**: Overhead order screen displaying exact layer orders, required shape, icing, and toppings with an animated Chef avatar expressing real-time reactions.
- 🎵 **Custom Web Audio Synthesizer**: Procedural sound effects for conveyor movement, batter squirts, filling dollops, icing piping, success dings, error buzzers, and celebratory fanfare.
- ⚡ **Dynamic Difficulty Levels**:
  - **Easy**: 1-2 layer cakes, steady belt speed.
  - **Medium**: Up to 3 layers, faster conveyor belt, complex filling combinations.
  - **Hard**: Fast belt speed, multi-layered cakes with precise flavor orders and toppings.
- 🏆 **High Score Persistence**: Automatically tracks and saves top high scores locally with difficulty markers.
- 🎉 **Confetti Fanfare & Feedback**: Visual banner alerts for perfect deliveries, order mismatches, and belt overflows.
- 📖 **Interactive Guide**: Built-in instructions modal explaining mechanics, station controls, and tips.

---

## 🎮 How to Play

1. **Check the TV Order**: Look at the overhead TV monitor to see the target cake specifications (Shape, Layers of Batter & Filling, Icing, and Toppings).
2. **Station 0 (Pan)**: Select the matching pan shape (**Square**, **Circle**, or **Heart**) to place a cake pan on the conveyor belt.
3. **Station 1 (Batter)**: Dispense the requested batter flavor (**Chocolate**, **Strawberry**, or **Vanilla**).
4. **Station 2 (Filling)**: Add cream/jam filling inside the current layer if required by the order.
5. **Repeat Layers**: Stack additional batter & filling layers for multi-tiered cake orders!
6. **Station 3 (Icing)**: Pipe the top icing coating when all layers are complete.
7. **Station 4 (Topping)**: Garnish with the requested topping (**Gumdrops**, **Cherries**, **Clovers**, or **Powdered Sugar**).
8. **Station 5 (Delivery Box)**: Press **Deliver Cake** to send the finished cake for quality inspection!

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Engine**: Native Web Audio API (Synthesized SFX)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open your browser at `http://localhost:5173`.

### Production Build

```bash
# Typecheck and build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
cake game/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── game.ts
    ├── components/
    │   ├── CakeRenderer.tsx
    │   ├── ConveyorBelt.tsx
    │   ├── GameHUD.tsx
    │   ├── GameOverModal.tsx
    │   ├── InstructionsModal.tsx
    │   └── TVOrderMonitor.tsx
    ├── hooks/
    │   └── useGameEngine.ts
    └── utils/
        ├── audioSynth.ts
        ├── orderGenerator.ts
        └── validation.ts
```

---

## 📜 License

MIT License. Inspired by Microsoft Purble Place (Comfy Cakes).
