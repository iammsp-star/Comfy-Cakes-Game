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

export type ChefExpressionType = 'idle' | 'happy' | 'anxious' | 'surprised' | 'working';

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

  const [chefExpression, setChefExpression] = useState<ChefExpressionType>('idle');
  const [validationFeedback, setValidationFeedback] = useState<string | null>(null);
  const [activeDispenserStation, setActiveDispenserStation] = useState<number | null>(null);
  const [isBeltShuddering, setIsBeltShuddering] = useState<boolean>(false);
  const [beltMoveDirection, setBeltMoveDirection] = useState<'left' | 'right' | null>(null);
  const [isWrappingBox, setIsWrappingBox] = useState<boolean>(false);

  // Sound mute toggle
  const toggleMute = useCallback(() => {
    setGameState((prev) => {
      const nextMuted = !prev.isAudioMuted;
      audioSynth.setMuted(nextMuted);
      return { ...prev, isAudioMuted: nextMuted };
    });
  }, []);

  // Trigger chef expression reaction with auto-reset to idle
  const triggerChefReaction = useCallback((reaction: ChefExpressionType, durationMs = 2500) => {
    setChefExpression(reaction);
    setTimeout(() => {
      setChefExpression('idle');
    }, durationMs);
  }, []);

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
    setActiveDispenserStation(null);
    setIsWrappingBox(false);
  }, [difficulty]);

  // Step Conveyor Belt Left (Backward) or Right (Forward)
  const stepConveyor = useCallback((direction: 'left' | 'right') => {
    if (gameState.isPaused || gameState.isGameOver) return;

    audioSynth.playConveyorStep();
    setBeltMoveDirection(direction);
    triggerChefReaction('anxious', 600);

    setGameState((prev) => {
      const updatedCakes: ActiveCake[] = [];

      for (const cake of prev.activeCakes) {
        if (cake.isScrapped) continue;

        const nextStation = direction === 'right' ? cake.currentStationIndex + 1 : cake.currentStationIndex - 1;

        // Scrapped if stepped past Station 5 (right) or past Station 0 (left)
        if (nextStation > 5) {
          audioSynth.playTrashScrap();
          triggerChefReaction('surprised');
          setValidationFeedback('💥 A cake fell off the conveyor belt line!');
          continue;
        }
        if (nextStation < 0) {
          audioSynth.playTrashScrap();
          triggerChefReaction('surprised');
          setValidationFeedback('💥 A cake fell off the start of the conveyor line!');
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

    setTimeout(() => {
      setBeltMoveDirection(null);
      setIsBeltShuddering(true);
      setTimeout(() => {
        setIsBeltShuddering(false);
      }, 400);
    }, 450);
  }, [gameState.isPaused, gameState.isGameOver, triggerChefReaction]);

  const advanceConveyor = useCallback(() => {
    stepConveyor('right');
  }, [stepConveyor]);

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

  // Mechanical anticipation sequence
  const runMechanicalSequence = useCallback(
    (stationIdx: number, actionFn: () => void, soundFn: () => void) => {
      if (gameState.isPaused || gameState.isGameOver) return;

      audioSynth.playClickPop();
      audioSynth.playNozzleWhirr(true);
      setActiveDispenserStation(stationIdx);
      triggerChefReaction('working', 600);

      setTimeout(() => {
        soundFn();
        actionFn();

        setTimeout(() => {
          audioSynth.playNozzleWhirr(false);
          setActiveDispenserStation(null);
        }, 300);
      }, 140);
    },
    [gameState.isPaused, gameState.isGameOver, triggerChefReaction]
  );

  // Station 0: Select Pan Shape
  const selectShape = useCallback(
    (shape: CakeShape) => {
      const existingAt0 = gameState.activeCakes.find(
        (c) => c.currentStationIndex === 0 && !c.isScrapped
      );
      if (existingAt0) return;

      runMechanicalSequence(
        0,
        () => {
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
        () => audioSynth.playPanDrop()
      );
    },
    [gameState.activeCakes, runMechanicalSequence]
  );

  // Station 1: Add Batter
  const addBatter = useCallback(
    (flavor: Flavor) => {
      runMechanicalSequence(
        1,
        () => {
          setGameState((prev) => {
            const cakes = prev.activeCakes.map((c) => {
              if (c.currentStationIndex === 1 && !c.isScrapped) {
                const updatedLayers = [...c.layers, { batter: flavor }];
                return { ...c, layers: updatedLayers };
              }
              return c;
            });
            return { ...prev, activeCakes: cakes };
          });
        },
        () => audioSynth.playBatterDispense()
      );
    },
    [runMechanicalSequence]
  );

  // Station 2: Add Filling
  const addFilling = useCallback(
    (flavor: Flavor) => {
      runMechanicalSequence(
        2,
        () => {
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
        () => audioSynth.playFillingDispense()
      );
    },
    [runMechanicalSequence]
  );

  // Station 3: Add Icing
  const addIcing = useCallback(
    (flavor: Flavor) => {
      runMechanicalSequence(
        3,
        () => {
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
        () => audioSynth.playIcingDispense()
      );
    },
    [runMechanicalSequence]
  );

  // Station 4: Add Topping
  const addTopping = useCallback(
    (topping: Topping) => {
      runMechanicalSequence(
        4,
        () => {
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
        () => audioSynth.playToppingDispense()
      );
    },
    [runMechanicalSequence]
  );

  // Station 5: Deliver Cake & Gift Box Wrapping Sequence
  const deliverCake = useCallback(
    (cakeId: string) => {
      if (gameState.isPaused || gameState.isGameOver || isWrappingBox) return;

      const targetCake = gameState.activeCakes.find((c) => c.id === cakeId);
      if (!targetCake) return;

      // Start Gift Box Wrapping sequence
      setIsWrappingBox(true);
      audioSynth.playBoxWrapSFX();

      const isValid = validateCake(targetCake, gameState.currentOrder);
      const inspection = inspectCakeDetails(targetCake, gameState.currentOrder);

      // Wait 1.1s for box drop & wrap before score & delivery resolves
      setTimeout(() => {
        setIsWrappingBox(false);

        if (isValid) {
          // Perfect Order!
          audioSynth.playSuccessDelivery();
          triggerChefReaction('happy', 3500);

          confetti({
            particleCount: 110,
            spread: 90,
            origin: { y: 0.5 },
          });

          const diffMultiplier = gameState.difficulty === 'hard' ? 3 : gameState.difficulty === 'medium' ? 2 : 1;
          const addedScore = (500 + gameState.streakCount * 100) * diffMultiplier;

          setValidationFeedback(`✨ Perfect Cake Wrapped & Shipped! +${addedScore} Points!`);

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
          triggerChefReaction('surprised', 3000);

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
      }, 1100);
    },
    [gameState.isPaused, gameState.isGameOver, isWrappingBox, gameState.activeCakes, gameState.currentOrder, gameState.difficulty, gameState.streakCount, triggerChefReaction]
  );

  // Trash / Scrap Cake
  const trashCake = useCallback((cakeId: string) => {
    audioSynth.playTrashScrap();
    triggerChefReaction('surprised', 2500);
    setValidationFeedback('🗑️ Cake scrapped to trash bin.');

    setGameState((prev) => ({
      ...prev,
      activeCakes: prev.activeCakes.filter((c) => c.id !== cakeId),
    }));
  }, [triggerChefReaction]);

  // Save High Score
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

  const togglePause = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  return {
    gameState,
    chefExpression,
    validationFeedback,
    activeDispenserStation,
    isBeltShuddering,
    beltMoveDirection,
    isWrappingBox,
    setDifficulty,
    startNewGame,
    stepConveyor,
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
