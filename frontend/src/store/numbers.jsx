export const numbers = (set, get) => ({
  selected: [0],
  setNumbers: (selectedNumbers) => {
    set((state) => ({ ...state, numbers: { ...state.numbers, selected: selectedNumbers } }));
  },
});
