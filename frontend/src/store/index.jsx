import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { endTime } from "./endtime";
import { numbers } from "./numbers";
import { pot } from "./pot";
import { ticket } from "./ticket";
import { winner } from "./winner";
import { reset } from "./reset";

const useStore = create(
  devtools((set, get) => ({
    contractAddress: "0x690B73FD0A7f922802C4E79f2465fd86C78b2Eee",

    pot: pot(set, get),
    ticket: ticket(set, get),
    numbers: numbers(set, get),
    endTime: endTime(set, get),
    winner: winner(set, get),
    reset: reset(set, get),

    hasLotteryEnded: false,
    setHasLotteryEnded: (hasLotteryEnded) => {
      const currentTime = Math.floor(new Date().getTime() / 1000);
      if (currentTime > get().endTime.value) {
        set({ hasLotteryEnded: true });
      } else {
        set({ hasLotteryEnded: false });
      }
    },
    errors: [],
    setErrors: (errors) => set({ errors: errors }),
  }))
);

export default useStore;
