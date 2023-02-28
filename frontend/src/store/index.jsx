import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { endTime } from "./endtime";
import { numbers } from "./numbers";
import { pot } from "./pot";
import { ticket } from "./ticket";
import { winner } from "./winner";

const useStore = create(
  devtools((set, get) => ({
    pot: pot(set, get),
    ticket: ticket(set, get),
    numbers: numbers(set, get),
    endTime: endTime(set, get),
    winner: winner(set, get),

    hasLotteryEnded: true,
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
