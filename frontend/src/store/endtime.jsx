import { readContract } from "@wagmi/core";
import { BigNumber } from "ethers";
import tokenContract from "../contracts/lottery.json";

export const endTime = (set, get) => ({
  value: 0,
  readContract: async () => {
    const { contractAddress } = get();
    const data = await readContract({
      abi: tokenContract,
      address: contractAddress,
      functionName: "getEndTime",
    });
    set((state) => ({
      ...state,
      endTime: {
        ...state.endTime,
        value: BigNumber.from(data).toNumber(),
      },
    }));
  },
});
