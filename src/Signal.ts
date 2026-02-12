import { Base } from "./Base";

export class Signal<T> extends Base<T> {
  public set(value: T) {
    this.value = value;
    this.emit();
  }

  public update(setter: (current: T) => T) {
    this.set(setter(this.value));
  }
}
