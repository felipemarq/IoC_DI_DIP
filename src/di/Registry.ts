import { Constructor } from "../types/utils";

export interface IDIContainer {
  register<T>(implementation: Constructor<T>): void;
  resolve<T>(implementation: Constructor<T>): T;
}

export class Registry implements IDIContainer {
  private static instance: Registry;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Registry();
    }
    return this.instance;
  }
  private readonly services: Map<string, Constructor<any>> = new Map();
  private constructor() {}

  register<T>(implementation: Constructor<T>) {
    const token = implementation.name;
    if (this.services.has(token)) {
      throw new Error(`Service "${token}" already registered`);
    }
    this.services.set(token, implementation);
  }

  resolve<T>(implementation: Constructor<T>): T {
    const token = implementation.name;

    const impl = this.services.get(token);
    if (!impl) {
      throw new Error(`Service "${token}" not registered`);
    }

    return new impl();
  }
}
