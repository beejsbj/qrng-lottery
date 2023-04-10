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

    const config = await prepareWriteContract({
      abi: tokenContract,
      address: contractAddress,
      functionName: "enter",
      args: [selected, amount],
      overrides: {
        value: ethers.utils.parseEther(Decimal(0.001).times(amount) + ""),
      },
    });

    set((state) => ({
      ...state,
      ticket: {
        ...state.ticket,
        loadingContract: { status: true, message: "See Wallet" },
      },
    }));

    const { hash } = await writeContract(config);

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

    const { data } = await waitForTransaction({
      hash,
      confirmations: 1,
    });

    AirnodeRrpV0;

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
    get().pot.readContract();
  },
});
