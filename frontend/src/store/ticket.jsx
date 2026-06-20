export const ticket = (set, get) => ({
  amount: 1,

  setAmount: (amount) =>
    set((state) => ({ ...state, ticket: { ...state.ticket, amount } })),
  loadingContract: { status: false, message: "" },

  writeContract: async () => {
    get().web3Demo.startTicketPurchase();
  },
});
