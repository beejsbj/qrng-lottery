import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { endTime } from "./endtime";
import { numbers } from "./numbers";
import { pot } from "./pot";
import { ticket } from "./ticket";

const useStore = create(
  devtools((set, get) => ({
    pot: pot(set, get),
    ticket: ticket(set, get),
    numbers: numbers(set, get),
    endTime: endTime(set, get),
    errors: [],
    setErrors: (errors) => set({ errors: errors }),
  }))
);

export default useStore;
