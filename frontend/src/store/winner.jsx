import { readContract, writeContract } from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import tokenContract from "../contracts/lottery.json";

export const winner = (set, get) => ({
  LastNWeeksWinningNumber: [],
  LastNweeksWinningPot: [],

  getLastNWeeksWinningNumber: async () => {
    //  const { contractAddress } = get();
    //  const data = await readContract({
    //    abi: tokenContract,
    //    address: contractAddress,
    //    functionName: "getLastNWeeksWinningNumber",
    //    args: [3],
    //  });

    //  generate an array of random numbers from 1-50
    const data = [
      Math.floor(Math.random() * 50) + 1,
      Math.floor(Math.random() * 50) + 1,
      Math.floor(Math.random() * 50) + 1,
    ];
    console.log(data);

    set((state) => ({
      ...state,
      winner: {
        ...state.winner,
        LastNWeeksWinningNumber: data.map((number) => number),
      },
    }));
  },

  getLastNWeeksWinningPot: async () => {
    //  const { contractAddress } = get();
    //  const data = await readContract({
    //    abi: tokenContract,
    //    address: contractAddress,
    //    functionName: "getLastNWeeksWinningPot",
    //    args: [3],
    //  });

    //  generate an array of random numbers upto 1000

    const data = [
      Math.floor(Math.random() * 1000) + 1,
      Math.floor(Math.random() * 1000) + 1,
      Math.floor(Math.random() * 1000) + 1,
    ];
    console.log(data);

    set((state) => ({
      ...state,
      winner: {
        ...state.winner,
        LastNweeksWinningPot: data.map((number) => number),
      },
    }));
  },
});
