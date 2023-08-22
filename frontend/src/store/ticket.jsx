import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import { AirnodeRrpV0 } from "@api3/airnode-protocol";
import tokenContract from "../contracts/lottery.json";
import { ethers } from "ethers";
import { Decimal } from "decimal.js";

export const ticket = (set, get) => ({
  amount: 1,

  setAmount: (amount) =>
    set((state) => ({ ...state, ticket: { ...state.ticket, amount } })),
  loadingContract: { status: false, message: "" },

  writeContract: async () => {
    const { amount } = get().ticket;
    const { selected } = get().numbers;
    const { contractAddress } = get();

    set((state) => ({
      ...state,
      ticket: {
        ...state.ticket,
        loadingContract: { status: true, message: "See Wallet" },
      },
    }));

    await new Promise((r) => setTimeout(r, 3000));

    set((state) => ({
      ...state,
      ticket: {
        ...state.ticket,
        loadingContract: {
          status: true,
          message: "Waiting for Confirmaiton",
        },
      },
    }));

    await new Promise((r) => setTimeout(r, 3000));

    set((state) => ({
      ...state,
      ticket: {
        ...state.ticket,
        loadingContract: {
          status: true,
          message: `You have ${amount} tickets}`,
        },
      },
    }));

    await new Promise((r) => setTimeout(r, 3000));

    set((state) => ({
      ...state,
      ticket: {
        ...state.ticket,
        loadingContract: {
          status: true,
          message: `You have selected ${selected} numbers`,
        },
      },
    }));

    await new Promise((r) => setTimeout(r, 3000));

    set((state) => ({
      ...state,
      ticket: {
        ...state.ticket,
        loadingContract: {
          status: true,
          message: "Waiting for Confirmaiton",
        },
      },
    }));

    await new Promise((r) => setTimeout(r, 2000));

    set((state) => ({
      ...state,
      ticket: {
        ...state.ticket,
        loadingContract: {
          status: true,
          message: "Completed!",
        },
      },
    }));
    await new Promise((r) => setTimeout(r, 500));

    set((state) => ({
      ...state,
      ticket: {
        ...state.ticket,
        loadingContract: {
          status: false,
          message: "Completed!",
        },
      },
    }));

    get().pot.addToAmount(amount);
  },
});
