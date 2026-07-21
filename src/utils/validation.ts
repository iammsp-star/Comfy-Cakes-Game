import { ActiveCake, CakeSpec } from '../types/game';

/**
 * Deep equality check comparing actual active cake against target order CakeSpec
 */
export function validateCake(actual: ActiveCake, target: CakeSpec): boolean {
  if (!actual.shape || actual.shape !== target.shape) return false;
  if (actual.icing !== target.icing) return false;
  if (actual.topping !== target.topping) return false;
  
  if (!actual.layers || actual.layers.length !== target.layers.length) return false;

  for (let i = 0; i < target.layers.length; i++) {
    if (actual.layers[i].batter !== target.layers[i].batter) return false;
    if (actual.layers[i].filling !== target.layers[i].filling) return false;
  }

  return true;
}

export interface CakeValidationResult {
  isValid: boolean;
  mismatches: string[];
}

/**
 * Detailed validation breakdown for UI feedback showing exactly what went wrong or matched!
 */
export function inspectCakeDetails(actual: ActiveCake, target: CakeSpec): CakeValidationResult {
  const mismatches: string[] = [];

  if (!actual.shape) {
    mismatches.push('Missing cake pan shape!');
  } else if (actual.shape !== target.shape) {
    mismatches.push(`Wrong shape: expected ${target.shape}, got ${actual.shape}`);
  }

  if (!actual.layers || actual.layers.length === 0) {
    mismatches.push('Cake has no batter/layers!');
  } else {
    if (actual.layers.length !== target.layers.length) {
      mismatches.push(`Wrong layer count: expected ${target.layers.length} layers, got ${actual.layers.length}`);
    }
    const maxIndex = Math.max(actual.layers.length, target.layers.length);
    for (let i = 0; i < maxIndex; i++) {
      const actLayer = actual.layers[i];
      const tgtLayer = target.layers[i];
      if (tgtLayer && !actLayer) {
        mismatches.push(`Layer ${i + 1} is missing!`);
      } else if (actLayer && !tgtLayer) {
        mismatches.push(`Extra layer ${i + 1} added!`);
      } else if (actLayer && tgtLayer) {
        if (actLayer.batter !== tgtLayer.batter) {
          mismatches.push(`Layer ${i + 1} batter mismatch: expected ${tgtLayer.batter}, got ${actLayer.batter}`);
        }
        if (tgtLayer.filling && actLayer.filling !== tgtLayer.filling) {
          mismatches.push(`Layer ${i + 1} filling mismatch: expected ${tgtLayer.filling}, got ${actLayer.filling || 'none'}`);
        } else if (!tgtLayer.filling && actLayer.filling) {
          mismatches.push(`Layer ${i + 1} should not have filling!`);
        }
      }
    }
  }

  if (target.icing && actual.icing !== target.icing) {
    mismatches.push(`Icing mismatch: expected ${target.icing}, got ${actual.icing || 'none'}`);
  } else if (!target.icing && actual.icing) {
    mismatches.push('Cake should not have icing!');
  }

  if (target.topping && actual.topping !== target.topping) {
    mismatches.push(`Topping mismatch: expected ${target.topping}, got ${actual.topping || 'none'}`);
  } else if (!target.topping && actual.topping) {
    mismatches.push('Cake should not have toppings!');
  }

  return {
    isValid: mismatches.length === 0,
    mismatches
  };
}
