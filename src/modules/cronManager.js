const Queue = require('bull');

/** Class representing a task manager */
class TaskManager {
  /** Starts the queue instance
   * @param{string} name - Name of queue
   */
  constructor(name) {
    this.queue = new Queue(name);
  }

  /** Adds a task to the queue
   * @param {object} job - Job to be added
   */
  addTask(job) {
    const newJob = this.queue.add(job);
    return newJob;
  }
}

module.exports = TaskManager;
