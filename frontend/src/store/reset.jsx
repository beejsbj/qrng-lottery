import { prepareWriteContract, writeContract, waitForTransaction, getContract, watchContractEvent } from "@wagmi/core";
import tokenContract from "../contracts/lottery.json";
import { ethers } from "ethers";

export const reset = (set, get) => ({
  loadingContract: false,

  writeContract: async () => {
    const lottery = await getContract({
      address: "0x690B73FD0A7f922802C4E79f2465fd86C78b2Eee",
      abi: tokenContract,
    });
    const config = await prepareWriteContract({
      abi: tokenContract,
      address: "0x690B73FD0A7f922802C4E79f2465fd86C78b2Eee",
      functionName: "getWinningNumber",
      overrides: {
        value: ethers.utils.parseEther("0.01"),
      },
    });
    const { hash } = await writeContract(config);
    set((state) => ({ ...state, reset: { ...state.reset, loadingContract: true } }));
    const data = await waitForTransaction({
      hash,
      confirmations: 1,
    });
    const log = data.logs.find((log) => log.address === "0x690B73FD0A7f922802C4E79f2465fd86C78b2Eee");
    const parsedLog = lottery.interface.parseLog(log);
    const logRequestId = parsedLog.args.requestId;
    console.log(logRequestId);
    console.log("waiting for random number to be generated...");
    const unwatch = watchContractEvent(
      {
        address: "0x690B73FD0A7f922802C4E79f2465fd86C78b2Eee",
        abi: tokenContract,
        eventName: "ReceivedRandomNumber",
      },
      (requestId, randomNumber) => {
        console.log(requestId, randomNumber);
        if (requestId === logRequestId) unwatch();
        get().endTime.readContract();
        set((state) => ({ ...state, reset: { ...state.reset, loadingContract: false } }));
      }
    );
  },
});
