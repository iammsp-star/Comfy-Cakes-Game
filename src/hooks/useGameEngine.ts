import { useCallback, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ActiveCake,
  CakeShape,
  CakeSpec,
  Difficulty,
  Flavor,
  GameState,
  HighScore,
  Topping,
} from '../types/game';
import { audioSynth } from '../utils/audioSynth';
import { generateOrder } from '../utils/orderGenerator';
import { inspectCakeDetails, validateCake } from '../utils/validation';

const HIGH_SCORES_KEY = 'purble_place_comfy_cakes_highscores';

const SPEED_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 5000,
  medium: 3800,
  hard: 2600,
};

export function useGameEngine() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedScores = localStorage.getItem(HIGH_SCORES_KEY);
    const initialScores: HighScore[] = savedScores ? JSON.parse(savedScores) : [];

    return {
      score: 0,
      lives: 3,
      currentOrder: generateOrder('easy'),
      activeCakes: [],
      conveyorSpeed: SPEED_BY_DIFFICULTY.easy,
      difficulty: 'easy',
      isPaused: false,
      isGameOver: false,
      ordersCompleted: 0,
      streakCount: 0,
      highScores: initialScores,
      isAudioMuted: false,
    };
  });

  const [chefExpression, setChefExpression] = useState<'idle' | 'happy' | 'surprised'>('idle');
  const [validationFeedback, setValidationFeedback] = useState<string | null>(null);

  // Sound mute toggle
  const toggleMute = useCallback(() => {
    setGameState((prev) => {
      const nextMuted = !prev.isAudioMuted;
      audioSynth.setMuted(nextMuted);
      return { ...prev, isAudioMuted: nextMuted };
    });
  }, []);

  // Reset expression back to idle after 2.5 seconds
  const triggerChefReaction = (reaction: 'happy' | 'surprised') => {
    setChefExpression(reaction);
    setTimeout(() => {
      setChefExpression('idle');
    }, 2500);
  };

  // Start new game
  const startNewGame = useCallback((selectedDifficulty?: Difficulty) => {
    const diff = selectedDifficulty || difficulty;
    setDifficulty(diff);
    setGameState((prev) => ({
      ...prev,
      score: 0,
      lives: 3,
      currentOrder: generateOrder(diff),
      activeCakes: [],
      conveyorSpeed: SPEED_BY_DIFFICULTY[diff],
      difficulty: diff,
      isPaused: false,
      isGameOver: false,
      ordersCompleted: 0,
      streakCount: 0,
    }));
    setValidationFeedback(null);
    setChefExpression('idle');
  }, [difficulty]);

  // Advance conveyor belt step
  const advanceConveyor = useCallback(() => {
    if (gameState.isPaused || gameState.isGameOver) return;

    audioSynth.playConveyorStep();

    setGameState((prev) => {
      const updatedCakes: ActiveCake[] = [];

      for (const cake of prev.activeCakes) {
        if (cake.isScrapped) continue;

        const nextStation = cake.currentStationIndex + 1;

        // If cake moves beyond Station 5, it is automatically scrapped
        if (nextStation > 5) {
          audioSynth.playTrashScrap();
          triggerChefReaction('surprised');
          setValidationFeedback('A cake fell off the conveyor belt line!');
          continue;
        }

        updatedCakes.push({
          ...cake,
          currentStationIndex: nextStation,
        });
      }

      return {
        ...prev,
        activeCakes: updatedCakes,
      };
    });
  }, [gameState.isPaused, gameState.isGameOver]);

  // Return Mechanism: Sends a cake back to Station 1 (Batter) for multi-layer stacking
  const returnCakeToBatter = useCallback((cakeId: string) => {
    audioSynth.playConveyorStep();
    setValidationFeedback('🔁 Cake returned to Station 1 for next layer!');
    setGameState((prev) => ({
      ...prev,
      activeCakes: prev.activeCakes.map((c) =>
        c.id === cakeId ? { ...c, currentStationIndex: 1 } : c
      ),
    }));
  }, []);

  // Station 0: Select Pan Shape
  const selectShape = useCallback(
    (shape: CakeShape) => {
      if (gameState.isPaused || gameState.isGameOver) return;

      // Check if slot 0 already has a cake
      const existingAt0 = gameState.activeCakes.find(
        (c) => c.currentStationIndex === 0 && !c.isScrapped
      );

      if (existingAt0) return;

      audioSynth.playPanDrop();

      const newCake: ActiveCake = {
        id: 'cake_' + Math.random().toString(36).substring(2, 9),
        shape,
        layers: [],
        currentStationIndex: 0,
      };

      setGameState((prev) => ({
        ...prev,
        activeCakes: [...prev.activeCakes, newCake],
      }));
    },
    [gameState.isPaused, gameState.isGameOver, gameState.activeCakes]
  );

  // Station 1: Add Batter
  const addBatter = useCallback(
    (flavor: Flavor) => {
      if (gameState.isPaused || gameState.isGameOver) return;

      audioSynth.playBatterDispense();

      setGameState((prev) => {
        const cakes = prev.activeCakes.map((c) => {
          if (c.currentStationIndex === 1 && !c.isScrapped) {
            // Push new layer batter
            const updatedLayers = [...c.layers, { batter: flavor }];
            return { ...c, layers: updatedLayers };
          }
          return c;
        });
        return { ...prev, activeCakes: cakes };
      });
    },
    [gameState.isPaused, gameState.isGameOver]
  );

  // Station 2: Add Filling
  const addFilling = useCallback(
    (flavor: Flavor) => {
      if (gameState.isPaused || gameState.isGameOver) return;

      audioSynth.playFillingDispense();

      setGameState((prev) => {
        const cakes = prev.activeCakes.map((c) => {
          if (c.currentStationIndex === 2 && !c.isScrapped && c.layers.length > 0) {
            const layersCopy = [...c.layers];
            const topLayerIndex = layersCopy.length - 1;
            layersCopy[topLayerIndex] = {
              ...layersCopy[topLayerIndex],
              filling: flavor,
            };
            return { ...c, layers: layersCopy };
          }
          return c;
        });
        return { ...prev, activeCakes: cakes };
      });
    },
    [gameState.isPaused, gameState.isGameOver]
  );

  // Station 3: Add Icing
  const addIcing = useCallback(
    (flavor: Flavor) => {
      if (gameState.isPaused || gameState.isGameOver) return;

      audioSynth.playIcingDispense();

      setGameState((prev) => {
        const cakes = prev.activeCakes.map((c) => {
          if (c.currentStationIndex === 3 && !c.isScrapped && c.layers.length > 0) {
            return { ...c, icing: flavor };
          }
          return c;
        });
        return { ...prev, activeCakes: cakes };
      });
    },
    [gameState.isPaused, gameState.isGameOver]
  );

  // Station 4: Add Topping
  const addTopping = useCallback(
    (topping: Topping) => {
      if (gameState.isPaused || gameState.isGameOver) return;

      audioSynth.playToppingDispense();

      setGameState((prev) => {
        const cakes = prev.activeCakes.map((c) => {
          if (c.currentStationIndex === 4 && !c.isScrapped && c.layers.length > 0) {
            return { ...c, topping };
          }
          return c;
        });
        return { ...prev, activeCakes: cakes };
      });
    },
    [gameState.isPaused, gameState.isGameOver]
  );

  // Station 5: Deliver Cake & Quality Check
  const deliverCake = useCallback(
    (cakeId: string) => {
      if (gameState.isPaused || gameState.isGameOver) return;

      const targetCake = gameState.activeCakes.find((c) => c.id === cakeId);
      if (!targetCake) return;

      const isValid = validateCake(targetCake, gameState.currentOrder);
      const inspection = inspectCakeDetails(targetCake, gameState.currentOrder);

      if (isValid) {
        // Perfect Order!
        audioSynth.playSuccessDelivery();
        triggerChefReaction('happy');

        // Confetti Celebration
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
        });

        const diffMultiplier = gameState.difficulty === 'hard' ? 3 : gameState.difficulty === 'medium' ? 2 : 1;
        const addedScore = (500 + gameState.streakCount * 100) * diffMultiplier;

        setValidationFeedback(`✨ Perfect Cake Delivered! +${addedScore} Points!`);

        setGameState((prev) => {
          const nextStreak = prev.streakCount + 1;
          const nextScore = prev.score + addedScore;
          const nextCompleted = prev.ordersCompleted + 1;
          const newOrder = generateOrder(prev.difficulty);

          return {
            ...prev,
            score: nextScore,
            streakCount: nextStreak,
            ordersCompleted: nextCompleted,
            currentOrder: newOrder,
            activeCakes: prev.activeCakes.filter((c) => c.id !== cakeId),
          };
        });
      } else {
        // Mismatch Order!
        audioSynth.playWrongDelivery();
        triggerChefReaction('surprised');

        const mainError = inspection.mismatches[0] || 'Cake does not match target order!';
        setValidationFeedback(`❌ ${mainError}`);

        setGameState((prev) => {
          const nextLives = prev.lives - 1;
          const isOver = nextLives <= 0;

          if (isOver) {
            saveHighScore(prev.score, prev.difficulty, prev.highScores);
          }

          return {
            ...prev,
            lives: nextLives,
            streakCount: 0,
            isGameOver: isOver,
            activeCakes: prev.activeCakes.filter((c) => c.id !== cakeId),
          };
        });
      }
    },
    [gameState.isPaused, gameState.isGameOver, gameState.activeCakes, gameState.currentOrder, gameState.difficulty, gameState.streakCount]
  );

  // Trash / Scrap Cake
  const trashCake = useCallback((cakeId: string) => {
    audioSynth.playTrashScrap();
    triggerChefReaction('surprised');
    setValidationFeedback('Cake scrapped to the trash bin.');

    setGameState((prev) => ({
      ...prev,
      activeCakes: prev.activeCakes.filter((c) => c.id !== cakeId),
    }));
  }, []);

  // Save High Score to LocalStorage
  const saveHighScore = (score: number, diff: Difficulty, currentScores: HighScore[]) => {
    if (score <= 0) return;
    const newRecord: HighScore = {
      name: 'Player',
      score,
      date: new Date().toLocaleDateString(),
      difficulty: diff,
    };
    const updated = [...currentScores, newRecord].sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(updated));
    setGameState((prev) => ({ ...prev, highScores: updated }));
  };

  // Toggle Pause
  const togglePause = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  return {
    gameState,
    chefExpression,
    validationFeedback,
    setDifficulty,
    startNewGame,
    advanceConveyor,
    returnCakeToBatter,
    selectShape,
    addBatter,
    addFilling,
    addIcing,
    addTopping,
    deliverCake,
    trashCake,
    togglePause,
    toggleMute,
  };
}
