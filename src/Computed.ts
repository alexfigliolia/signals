import { AutoIncrementingID } from "@figliolia/event-emitter";

import type { Computer } from "./types";
import { Base } from "./Base";

export class Computed<T> extends Base<T> {
  private trackingID: string;
  protected listeners = new Map<string, () => void>();
  private static readonly trackingIDs = new AutoIncrementingID();
  constructor(private readonly computer: Computer<T>) {
    const trackingID = Computed.trackingIDs.get();
    const [value, dependencies] = Computed.runCompute(computer, trackingID);
    super(value);
    this.trackingID = trackingID;
    this.subscribe(dependencies);
  }

  private subscribe(dependencies: Map<string, Base<any>>) {
    for (const [ID, signal] of dependencies) {
      if (!this.listeners.has(ID)) {
        this.listeners.set(
          ID,
          signal.listen(() => this.recompute()),
        );
      }
    }
    for (const [ID, unsubscribe] of this.listeners) {
      if (!dependencies.has(ID)) {
        unsubscribe();
        this.listeners.delete(ID);
      }
    }
  }

  private set(value: T) {
    if (value !== this.value) {
      this.value = value;
      this.emit();
    }
  }

  private recompute() {
    const [value, dependencies] = Computed.runCompute(
      this.computer,
      this.trackingID,
    );
    this.set(value);
    this.subscribe(dependencies);
  }

  private static runCompute<T>(computer: Computer<T>, trackingID: string) {
    Base.CURRENT_COMPUTATION_ID = trackingID;
    const result = computer();
    const dependencies = Base.COMPUTATION_DEPENDENCIES.cloneAndReset();
    Base.CURRENT_COMPUTATION_ID = null;
    return [result, dependencies] as const;
  }
}
