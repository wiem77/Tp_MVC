class TaskController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.setupHandlers();
    this.initTasks();
  }

  setupHandlers() {
    document.getElementById('taskForm').addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleAddTask();
    });
    document
      .getElementById('sortTasks')
      .addEventListener('change', () => this.sortTasks());
  }

  handleAddTask() {
    const taskName = this.view.taskNameElement.value;
    const taskType = this.view.taskTypeElement.value;
    if (taskName && taskType) {
      const newTask = this.model.addTask(taskName, taskType);
      this.view.addTaskToList(newTask);
      this.view.clearInput();
    } else {
      alert('Please enter a task name.');
    }
  }

  sortTasks() {
    const difficulty = document.getElementById('sortTasks').value;
    const sortedTasks = this.model.getTasksByDifficulty(difficulty);
    this.view.displaySortedTasks(sortedTasks);
  }

  initTasks() {
    const allTasks = this.model.getTasksByDifficulty('All');
    this.view.displaySortedTasks(allTasks);

    const renderer = new HTMLTaskRenderer();
    renderer.displayTask({
      id: 1,
      name: 'test',
      taskType: 'Divers',
    });

    // const heritageRenderer = new HeritageOfHTMLTaskRenderer();
    // heritageRenderer.displayTask({ id: 2, name: "HeritageOfHTMLTaskRenderer test", taskType: "Divers" });

    // const invalidRenderer = new TaskRenderer();
    // invalidRenderer.displayTask({ id: 3, name: "TaskRenderer test", taskType: "Divers" });
  }
}

class TaskRenderer {
  constructor() {
    if (new.target === TaskRenderer) {
      throw new TypeError(
        'Error: TaskRenderer est conçue pour être une classe abstraite'
      );
    }
  }

  displayTask(task) {
    throw new Error("Method 'displayTask()' must be implemented.");
  }
}

class HTMLTaskRenderer extends TaskRenderer {
  constructor() {
    super();
  }

  displayTask(task) {
    const taskContainer = document.getElementById('tasksList');
    const taskElement = document.createElement('li');
    taskElement.className = 'task';
    taskElement.innerHTML = `
            Task ${task.id}: ${task.name}, ${task.taskType}
        `;
    this.applyStyle(taskElement, task.taskType);
    taskContainer.appendChild(taskElement);
  }

  applyStyle(taskElement, taskType) {
    const color = this.getColorForTaskType(taskType);
    taskElement.style.color = color;
  }

  getColorForTaskType(taskType) {
    switch (taskType) {
      case 'Easy':
        return 'green';
      case 'Medium':
        return 'orange';
      case 'Hard':
        return 'red';
      default:
        return 'black';
    }
  }
}

class HeritageOfHTMLTaskRenderer extends HTMLTaskRenderer {
  constructor() {
    super();
  }

  displayTask(task) {
    const taskContainer = document.getElementById('tasksList');
    const taskElement = document.createElement('li');
    taskElement.className = 'task heritage';
    taskElement.innerHTML = `
            Task ${task.id} - ${task.name}, ${task.taskType}
        `;
    this.applyStyle(taskElement, task.taskType);
    taskContainer.appendChild(taskElement);
  }
}
