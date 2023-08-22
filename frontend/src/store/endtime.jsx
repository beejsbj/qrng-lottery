import { readContract } from "@wagmi/core";
import { BigNumber } from "ethers";
import tokenContract from "../contracts/lottery.json";

export const endTime = (set, get) => ({
  value: 0,

  readContract: async () => {
    //  const { contractAddress } = get();
    //  const data = await readContract({
    //    abi: tokenContract,
    //    address: contractAddress,
    //    functionName: "getEndTime",
    //  });

    //  console.log(BigNumber.from(data).toNumber());

    //  new endTime = currentTime + 7 days

    const newEndTime = Math.floor(Date.now() / 1000) + 120;

    set((state) => ({
      ...state,
      endTime: {
        ...state.endTime,
        value: newEndTime,
      },
    }));
  },
});
