import { readContract, writeContract } from "@wagmi/core";
import { BigNumber } from "ethers";
import tokenContract from "../contracts/lottery.json";

export const winner = (set, get) => ({
  lastWeekWinningNumber: 0,
  getLastWeekWinningNumber: async () => {
    const data = await readContract({
      abi: tokenContract,
      address: "0x3E1Eb24ef031002E41d173BE2B1c7D04DF67b9d2",
      functionName: "getLastWeekWinningNumber",
    });
    set((state) => ({
      ...state,
      winner: {
        ...state.winner,
        lastWeekWinningNumber: BigNumber.from(data).toNumber(),
      },
    }));
  },
});
