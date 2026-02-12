import type { Computer } from "./types";
import { Computed } from "./Computed";

export const effect = (computer: Computer<void>) => {
  new Computed(computer);
};
