import { readContract } from "@wagmi/core";
import { BigNumber } from "ethers";
import tokenContract from "../contracts/lottery.json";

export const endTime = (set, get) => ({
  value: 0,
  readContract: async () => {
    const data = await readContract({
      abi: tokenContract,
      address: "0x3E1Eb24ef031002E41d173BE2B1c7D04DF67b9d2",
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