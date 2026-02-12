# Signals

A light-weight signals implementation that can be bound to any UI framework or library.

The implementation borrows some of the API from [Angular Signals](https://angular.dev/guide/signals) and the [TC39 Proposal](https://github.com/tc39/proposal-signals) while aiming to yield smaller bundle sizes and better portability between UI frameworks.

To accomplish the portability aspect, changed values are piped through an event emitter that can be consumed anywhere in your code without needing `effects` or static analysis. This will allow you to easily build abstractions or frameworks on top of the API.

## API

### Signals

Signals are primitive reactive values that can be used to store and derive application state from

```typescript
import { Signal } from "@figliolia/signals";

const signal = new Signal(1);

// get the current value
signal.get();

// set new values
signal.set(2);

// transform values
signal.update(previous => previous + 1);

// subscribe to changes
const listener = signal.listen(currentValue => {
  // on value change
});

// unsubscribe from changes
listener();
```

### Computed

Computed signals are readonly signals that derive their value based on a computation of other signals

```typescript
import { Computed, Signal } from "@figliolia/signals";

const signal1 = new Signal(1);
const signal2 = new Signal(1);

const computed = new Computed(() => signal1.get() + signal2.get());

// subscribe to changes
const listener = computed.listen(currentValue => {
  // on value change
});

// update the computed value
signal1.set(2); // computed === 3
signal2.set(2); // computed === 4

// unsubscribe from changes
listener();
```

### Effect

Effects are callback functions that can be executed anytime a signal changes

```typescript
import { effect, Signal } from "@figliolia/signals";

const signal1 = new Signal(1);
const signal2 = new Signal(1);

// Your effect callback will run on initialization and anytime
// a signal inside changes values
effect(() => {
  console.log(signal1.get(), signal2.get());
});
```

### Functional APIs

If functional programming is a little more your speed, this library comes with `signal` and `computed` functions that behave a little more like the [Angular Signals API](https://angular.dev/guide/signals)

```typescript
import { signal, computed } from "@figliolia/signals";

const signal1 = signal(1);
const signal2 = signal(1);

const myComputed = computed(() => signal1() + signal2());

// subscribe to changes
const listener = myComputed.listen(currentValue => {
  // on value change
});

// update the computed value
signal1.set(2); // computed === 3
signal2.set(2); // computed === 4

// unsubscribe from changes
listener();
```

## The TC39 Proposal

This implemenation differs from the TC39 proposal and is likely not going to mirror the native implemenation if the proposal passes.

When designing this API, I read the proposal and aimed to build the necessities of the proposal while omitting some of the internals that developers are likely to be using less often
