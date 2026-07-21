import { CakeShape, CakeSpec, Difficulty, Flavor, Topping } from '../types/game';

const SHAPES: CakeShape[] = ['square', 'circle', 'heart'];
const FLAVORS: Flavor[] = ['chocolate', 'strawberry', 'vanilla'];
const TOPPINGS: Topping[] = ['gumdrop', 'cherry', 'clover', 'powdered_sugar'];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateOrder(difficulty: Difficulty): CakeSpec {
  const id = 'order_' + Math.random().toString(36).substring(2, 9);
  const shape = getRandomItem(SHAPES);

  let numLayers = 1;
  if (difficulty === 'medium') {
    numLayers = 2;
  } else if (difficulty === 'hard') {
    numLayers = Math.random() > 0.4 ? 3 : 2;
  }

  const layers = [];
  for (let i = 0; i < numLayers; i++) {
    const batter = getRandomItem(FLAVORS);
    let filling: Flavor | undefined = undefined;

    if (difficulty === 'medium') {
      filling = getRandomItem(FLAVORS);
    } else if (difficulty === 'hard') {
      filling = getRandomItem(FLAVORS);
    }

    layers.push({ batter, filling });
  }

  let icing: Flavor | undefined = undefined;
  if (difficulty === 'easy') {
    // 60% chance of icing in Easy
    icing = Math.random() > 0.4 ? getRandomItem(FLAVORS) : undefined;
  } else {
    icing = getRandomItem(FLAVORS);
  }

  let topping: Topping | undefined = undefined;
  if (difficulty === 'medium') {
    // 80% chance of topping in Medium
    topping = Math.random() > 0.2 ? getRandomItem(TOPPINGS) : undefined;
  } else if (difficulty === 'hard') {
    // Always has topping in Hard
    topping = getRandomItem(TOPPINGS);
  }

  return {
    id,
    shape,
    layers,
    icing,
    topping
  };
}
