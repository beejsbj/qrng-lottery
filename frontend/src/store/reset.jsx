import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  getContract,
  watchContractEvent,
} from "@wagmi/core";
import tokenContract from "../contracts/lottery.json";
import { ethers } from "ethers";

export const reset = (set, get) => ({
  loadingContract: {
    status: false,
    message: "",
  },

  writeContract: async () => {
    const { contractAddress } = get();

    await new Promise((r) => setTimeout(r, 500));

    set((state) => ({
      ...state,
      reset: {
        ...state.reset,
        loadingContract: { status: true, message: "See Wallet" },
      },
    }));

    await new Promise((r) => setTimeout(r, 3000));
    set((state) => ({
      ...state,
      reset: {
        ...state.reset,
        loadingContract: {
          status: true,
          message: "Waiting for Confirmaiton",
        },
      },
    }));

    await new Promise((r) => setTimeout(r, 3000));

    //  const log = data.logs.find((log) => log.address === contractAddress);
    //  const parsedLog = lottery.interface.parseLog(log);
    //  const logRequestId = parsedLog.args.requestId;
    console.log("waiting for random number to be generated...");

    set((state) => ({
      ...state,
      reset: {
        ...state.reset,
        loadingContract: { status: true, message: "Generating Winning Number" },
      },
    }));

    await new Promise((r) => setTimeout(r, 3000));

    set((state) => ({
      ...state,
      reset: {
        ...state.reset,
        loadingContract: {
          status: true,
          message: "Restting Lottery",
        },
      },
    }));

    get().endTime.readContract();

    set((state) => ({
      ...state,
      reset: {
        ...state.reset,
        loadingContract: { status: false, message: "Completed!" },
      },
    }));
  },
});
