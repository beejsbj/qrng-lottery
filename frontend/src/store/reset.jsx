import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import tokenContract from "../contracts/lottery.json";
import { ethers } from "ethers";

export const reset = (set, get) => ({
  loadingContract: false,

  writeContract: async () => {
    const config = await prepareWriteContract({
      abi: tokenContract,
      address: "0x3E1Eb24ef031002E41d173BE2B1c7D04DF67b9d2",
      functionName: "getWinningNumber",
      overrides: {
        value: ethers.utils.parseEther("0.01"),
      },
    });
    const { hash } = await writeContract(config);
    const { data } = await waitForTransaction({
      hash,
      confirmations: 1,
    });
    get().endTime.readContract();
  },
});
