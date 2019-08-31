class Event {
  constructor() {
    this.events = {};
  }

  on(eventName, fn) {
    // Create event queue if doesn't exist
    this.events[eventName] = this.events[eventName] || [];
    // Add listener to the event queue
    this.events[eventName].push(fn);
  }

  off(eventName, fn) {
    // Find and remove listener from the event queue
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }

  emit(eventName, data) {
    // Call each listener in the event queue
    if (this.events[eventName]) {
      this.events[eventName].forEach(fn => fn(data));
    }
  }
}

const event = new Event();
export default event;
