/**
 * HALO Journey Memory Service
 * Stores journey observations, telemetry snapshots, and route deviation events for the active session.
 */

class JourneyMemoryStore {
  constructor() {
    this.memory = [];
    this.startTime = null;
    this.endTime = null;
    this.deviationCount = 0;
    this.observationCount = 0;
  }

  startSession() {
    this.memory = [];
    this.startTime = new Date();
    this.endTime = null;
    this.deviationCount = 0;
    this.observationCount = 0;
    this.recordEvent('Journey Started', 'Active GPS tracking and AI route companion initialized.');
  }

  recordEvent(type, description, level = 'Information') {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const entry = {
      id: `mem-${Date.now()}-${Math.random()}`,
      type,
      description,
      level,
      timestamp
    };

    if (type === 'Deviation Detected') {
      this.deviationCount++;
    }
    this.observationCount++;
    this.memory.unshift(entry);
    return entry;
  }

  getMemory() {
    return this.memory;
  }

  getStats() {
    return {
      startTime: this.startTime ? this.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--',
      observationCount: this.observationCount,
      deviationCount: this.deviationCount
    };
  }

  endSession() {
    this.endTime = new Date();
    this.recordEvent('Journey Completed', 'Destination reached or journey session terminated cleanly.', 'Information');
  }

  clear() {
    this.memory = [];
    this.startTime = null;
    this.endTime = null;
    this.deviationCount = 0;
    this.observationCount = 0;
  }
}

export const journeyMemory = new JourneyMemoryStore();
