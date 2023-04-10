import { readContract, writeContract } from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import tokenContract from "../contracts/lottery.json";

export const winner = (set, get) => ({
  LastNWeeksWinningNumber: [],
  LastNweeksWinningPot: [],

  getLastNWeeksWinningNumber: async () => {
    const { contractAddress } = get();
    const data = await readContract({
      abi: tokenContract,
      address: contractAddress,
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
    const { contractAddress } = get();
    const data = await readContract({
      abi: tokenContract,
      address: contractAddress,
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
