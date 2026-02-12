import type { Base } from "./Base";

export class Dependencies {
  private readonly cache = new Map<string, Base<any>>();

  public register(dependency: Base<any>) {
    if (!this.cache.has(dependency["ID"])) {
      this.cache.set(dependency["ID"], dependency);
    }
  }

  public remove(dependency: Base<any>) {
    return this.cache.delete(dependency["ID"]);
  }

  public cloneAndReset() {
    const clone = new Map(this.cache);
    this.cache.clear();
    return clone;
  }
}
