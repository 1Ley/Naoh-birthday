import { create } from 'zustand';

export type Stage = 'quiz' | 'memory' | 'runner' | 'finale';

interface GameState {
  currentStage: Stage;
  cakeIngredients: string[];
  setStage: (stage: Stage) => void;
  addIngredient: (item: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentStage: 'quiz',
  cakeIngredients: [],

  setStage: (stage) => set({ currentStage: stage }),

  addIngredient: (item) =>
    set((state) => ({
      cakeIngredients: state.cakeIngredients.includes(item)
        ? state.cakeIngredients
        : [...state.cakeIngredients, item],
    })),

  resetGame: () =>
    set({
      currentStage: 'quiz',
      cakeIngredients: [],
    }),
}));
