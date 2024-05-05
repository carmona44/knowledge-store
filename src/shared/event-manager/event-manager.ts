import { EventEmitter } from "events";

class EventManager extends EventEmitter {
  emit(event: string, ...args: any[]): boolean {
    return super.emit(event, ...args);
  }

  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }
}

const eventManager = new EventManager();

eventManager.on("error", (err) => {
  console.error("An error occurred:", err);
});

export default eventManager;
