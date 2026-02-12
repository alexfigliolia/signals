import { AutoIncrementingID, EventEmitter } from "@figliolia/event-emitter";

import { Dependencies } from "./Dependencies";

export class Base<T> {
  protected readonly ID: string;
  protected static readonly IDs = new AutoIncrementingID();
  protected readonly Emitter = new EventEmitter<{ change: T }>();
  protected static CURRENT_COMPUTATION_ID: string | null = null;
  protected static COMPUTATION_DEPENDENCIES = new Dependencies();
  constructor(protected value: T) {
    this.ID = Base.IDs.get();
  }

  public get() {
    if (Base.CURRENT_COMPUTATION_ID) {
      Base.COMPUTATION_DEPENDENCIES.register(this);
    }
    return this.value;
  }

  public listen(listener: (value: T) => void) {
    const ID = this.Emitter.on("change", listener);
    return () => this.Emitter.off("change", ID);
  }

  public valueOf() {
    return this.value;
  }

  public toJSON() {
    return this.value;
  }

  protected emit() {
    this.Emitter.emit("change", this.value);
  }
}
