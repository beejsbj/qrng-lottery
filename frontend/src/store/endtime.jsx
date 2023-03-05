import { readContract } from "@wagmi/core";
import { BigNumber } from "ethers";
import tokenContract from "../contracts/lottery.json";

export const endTime = (set, get) => ({
  value: 0,
  readContract: async () => {
    const data = await readContract({
      abi: tokenContract,
      address: "0x690B73FD0A7f922802C4E79f2465fd86C78b2Eee",
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
