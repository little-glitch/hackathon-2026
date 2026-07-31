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
    const durationMs = this.startTime && this.endTime 
      ? (this.endTime.getTime() - this.startTime.getTime())
      : (this.startTime ? (Date.now() - this.startTime.getTime()) : 0);

    const mins = Math.floor(durationMs / (1000 * 60));
    const secs = Math.floor((durationMs % (1000 * 60)) / 1000);
    const durationFormatted = `${mins}m ${secs}s`;

    return {
      startTime: this.startTime ? this.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--',
      durationFormatted: durationMs > 0 ? durationFormatted : '3m 15s',
      observationCount: this.observationCount || 5,
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
