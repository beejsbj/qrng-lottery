import { readContract } from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import tokenContract from "../contracts/lottery.json";

export const pot = (set, get) => ({
  amount: 0,
  readContract: async () => {
    const data = await readContract({
      abi: tokenContract,
      address: "0x3E1Eb24ef031002E41d173BE2B1c7D04DF67b9d2",
      functionName: "pot",
    });
    const potWei = BigNumber.from(data);
    set((state) => ({
      ...state,
      pot: {
        ...state.pot,
        amount: ethers.utils.formatEther(potWei),
      },
    }));
  },
});
