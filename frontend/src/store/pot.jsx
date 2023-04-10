import { readContract } from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import tokenContract from "../contracts/lottery.json";

export const pot = (set, get) => ({
  amount: 0,

  readContract: async () => {
    const { contractAddress } = get();
    const data = await readContract({
      abi: tokenContract,
      address: contractAddress,
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
