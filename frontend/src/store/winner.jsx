import { readContract, writeContract } from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import tokenContract from "../contracts/lottery.json";

export const winner = (set, get) => ({
  LastNWeeksWinningNumber: [],
  LastNweeksWinningPot: [],

  getLastNWeeksWinningNumber: async () => {
    const data = await readContract({
      abi: tokenContract,
      address: "0x690B73FD0A7f922802C4E79f2465fd86C78b2Eee",
      functionName: "getLastNWeeksWinningNumber",
      args: [3],
    });
    set((state) => ({
      ...state,
      winner: {
        ...state.winner,
        LastNWeeksWinningNumber: data.map((number) =>
          BigNumber.from(number).toString()
        ),
      },
    }));
  },

  getLastNWeeksWinningPot: async () => {
    const data = await readContract({
      abi: tokenContract,
      address: "0x690B73FD0A7f922802C4E79f2465fd86C78b2Eee",
      functionName: "getLastNWeeksWinningPot",
      args: [3],
    });
    set((state) => ({
      ...state,
      winner: {
        ...state.winner,
        LastNweeksWinningPot: data.map((number) =>
          ethers.utils.formatEther(BigNumber.from(number))
        ),
      },
    }));
  },
});
