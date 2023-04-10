import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  getContract,
  watchContractEvent,
} from "@wagmi/core";
import tokenContract from "../contracts/lottery.json";
import { ethers } from "ethers";

export const reset = (set, get) => ({
  loadingContract: {
    status: false,
    message: "",
  },

  writeContract: async () => {
    const { contractAddress } = get();

    const lottery = await getContract({
      address: contractAddress,
      abi: tokenContract,
    });
    const config = await prepareWriteContract({
      abi: tokenContract,
      address: contractAddress,
      functionName: "getWinningNumber",
      overrides: {
        value: ethers.utils.parseEther("0.01"),
      },
    });
    set((state) => ({
      ...state,
      reset: {
        ...state.reset,
        loadingContract: { status: true, message: "See Wallet" },
      },
    }));

    const { hash } = await writeContract(config);

    set((state) => ({
      ...state,
      reset: {
        ...state.reset,
        loadingContract: {
          status: true,
          message: "Waiting for Confirmaiton",
        },
      },
    }));

    const data = await waitForTransaction({
      hash,
      confirmations: 1,
    });

    const log = data.logs.find((log) => log.address === contractAddress);
    const parsedLog = lottery.interface.parseLog(log);
    const logRequestId = parsedLog.args.requestId;
    console.log("waiting for random number to be generated...");

    set((state) => ({
      ...state,
      reset: {
        ...state.reset,
        loadingContract: { status: true, message: "Generating Winning Number" },
      },
    }));

    const unwatch = watchContractEvent(
      {
        address: contractAddress,
        abi: tokenContract,
        eventName: "ReceivedRandomNumber",
      },
      (requestId, randomNumber) => {
        if (requestId === logRequestId) unwatch();
        get().endTime.readContract();

        set((state) => ({
          ...state,
          reset: {
            ...state.reset,
            loadingContract: { status: false, message: "Completed!" },
          },
        }));
      }
    );
  },
});
