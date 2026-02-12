import type { Computer } from "./types";
import { Computed } from "./Computed";

class Effect<T> extends Computed<T> {
  public destroy() {
    for (const [_, unsubscribe] of this.listeners) {
      unsubscribe();
    }
    this.Emitter.storage.clear();
  }
}

export const effect = (computer: Computer<void>) => {
  const listener = new Effect(computer);
  return () => listener.destroy();
};
