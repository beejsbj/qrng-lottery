import { readContract } from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import tokenContract from "../contracts/lottery.json";

export const pot = (set, get) => ({
  amount: 0,

  readContract: async () => {
    const data = await readContract({
      abi: tokenContract,
      address: "0x690B73FD0A7f922802C4E79f2465fd86C78b2Eee",
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
