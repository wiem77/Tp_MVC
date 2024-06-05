class TaskModel {
  constructor() {
    if (TaskModel.instance) {
      return TaskModel.instance;
    }
    TaskModel.instance = this;

    this.tasks = [
      { id: 1, name: 'Faire les courses', taskType: 'Divers' },
      { id: 2, name: 'Faire du jardinage', taskType: 'Maison' },
      { id: 3, name: 'Organiser une réunion', taskType: 'Travail' },
    ];
  }

  addTask(taskName, taskType) {
    const newTask = {
      id: this.tasks.length + 1,
      name: taskName,
      taskType: taskType,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  getTasksByDifficulty(difficulty) {
    if (difficulty === 'All') {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.taskType === difficulty);
  }
}
