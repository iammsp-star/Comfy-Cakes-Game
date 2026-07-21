export type CakeShape = 'square' | 'circle' | 'heart';
export type Flavor = 'chocolate' | 'strawberry' | 'vanilla';
export type Topping = 'gumdrop' | 'cherry' | 'clover' | 'powdered_sugar';

export interface CakeLayer {
  batter: Flavor;
  filling?: Flavor;
}

export interface CakeSpec {
  id: string;
  shape: CakeShape;
  layers: CakeLayer[]; // 1 to 3 layers
  icing?: Flavor;
  topping?: Topping;
}

export interface ActiveCake {
  id: string;
  shape?: CakeShape;
  layers: CakeLayer[]; // Current layers built so far
  icing?: Flavor;
  topping?: Topping;
  currentStationIndex: number; // 0: Pan, 1: Batter, 2: Filling, 3: Icing, 4: Topping, 5: Delivery
  isScrapped?: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface HighScore {
  name: string;
  score: number;
  date: string;
  difficulty: Difficulty;
}

export interface GameState {
  score: number;
  lives: number; // Defaults to 3
  currentOrder: CakeSpec;
  activeCakes: ActiveCake[];
  conveyorSpeed: number; // belt step interval in ms
  difficulty: Difficulty;
  isPaused: boolean;
  isGameOver: boolean;
  ordersCompleted: number;
  streakCount: number;
  highScores: HighScore[];
  isAudioMuted: boolean;
}
