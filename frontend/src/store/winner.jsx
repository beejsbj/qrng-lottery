import { readContract, writeContract } from "@wagmi/core";
import { BigNumber } from "ethers";
import tokenContract from "../contracts/lottery.json";

export const winner = (set, get) => ({
  lastWeekWinningNumber: 0,
  getLastWeekWinningNumber: async () => {
    const data = await readContract({
      abi: tokenContract,
      address: "0x690B73FD0A7f922802C4E79f2465fd86C78b2Eee",
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
