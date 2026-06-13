export const pot = (set, get) => ({
  amount: 0,

  setAmount: (newAmount) =>
    set((state) => ({ ...state, pot: { ...state.pot, newAmount } })),

  addToAmount: (toAdd) =>
    set((state) => ({
      ...state,
      pot: { ...state.pot, amount: Number(state.pot.amount || 0) + toAdd },
    })),

  readContract: async () => {
    const { contractAddress } = get();

    //  const data = await readContract({
    //    abi: tokenContract,
    //    address: contractAddress,
    //    functionName: "pot",
    //  });

    const data = Number((Math.random() * 1000).toFixed(0));

    await new Promise((r) => setTimeout(r, 200));

    set((state) => ({
      ...state,
      pot: {
        ...state.pot,
        amount: data,
      },
    }));
  },
});
