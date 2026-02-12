import { computed, effect, signal } from "./src";

const signal1 = signal(1);
const signal2 = signal(1);
const signal3 = signal(1);
const signal4 = signal(1);

const computed1 = computed(() => {
  if (signal1() < 2) {
    return signal1();
  }
  return signal1() + signal2() + signal3() + signal4();
});

const computed2 = computed(() => {
  if (signal1() < 2) {
    return signal1();
  }
  return computed1();
});

const destroy = effect(() => console.log(computed2()));

// signal1.set(1);
signal1.set(2);

destroy();

signal1.set(3);
