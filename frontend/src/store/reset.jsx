export const reset = (set, get) => ({
  loadingContract: {
    status: false,
    message: "",
  },

  writeContract: async () => {
    get().web3Demo.startDrawWinner();
  },
});
