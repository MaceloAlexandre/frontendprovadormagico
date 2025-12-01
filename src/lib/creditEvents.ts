type CreditEventListener = () => void;

class CreditEventEmitter {
  private listeners: CreditEventListener[] = [];

  subscribe(listener: CreditEventListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  emit() {
    this.listeners.forEach(listener => listener());
  }
}

export const creditEvents = new CreditEventEmitter();