import type { Computer } from "./types";
import { Signal } from "./Signal";
import { Computed } from "./Computed";

export const signal = <T>(value: T) => {
  const signal = new Signal(value);
  function instance() {
    return signal.get();
  }
  instance.signal = signal;
  instance.get = signal.get.bind(signal);
  instance.set = signal.set.bind(signal);
  instance.update = signal.update.bind(signal);
  instance.listen = signal.listen.bind(signal);
  return instance;
};

export const computed = <T>(value: Computer<T>) => {
  const signal = new Computed(value);
  function instance() {
    return signal.get();
  }
  instance.signal = signal;
  instance.get = signal.get.bind(signal);
  instance.listen = signal.listen.bind(signal);
  return instance;
};
