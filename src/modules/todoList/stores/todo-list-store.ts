import { defineStore } from 'pinia';
import { TodoList } from './todo-list-model';
import { Task } from './task-model';

const TodoListStore = defineStore('todos', {
  state: (): TodoList => ({
    tasks: [] as Task[],
  }),
  getters: {
    finishedCount(state): number {
      return state.tasks.filter((task) => task.isDone).length;
    },
    totalCount(state): number {
      return state.tasks.length;
    },
    isAllChecked(): boolean {
      return this.totalCount === this.finishedCount && this.totalCount > 0;
    },
    maxId(state): number {
      return state.tasks.length ? Math.max(...state.tasks.map((task) => task.id)) : 0;
    },
  },
  actions: {
    /**
     * Add a new task(task name can duplicate)
     * @param taskName task name
     */
    addTask(newTaskName: string) {
      this.tasks.push({
        id: this.maxId + 1,
        taskName: newTaskName,
        isDone: false,
      });
    },
    /**
     * Remove task by id
     * @param id task id
     */
    removeTask(id: number) {
      this.tasks.forEach((task: Task, index: number, tasks: Task[]) => {
        if (task.id === id) tasks.splice(index, 1);
      });
    },
    /**
     * Remove complete tasks from list
     */
    removeCompleteTasks() {
      const checkedTasks = this.tasks.filter((task) => !task.isDone);
      this.tasks = checkedTasks;
    },
    /**
     * Set all tasks state
     * @param checkState set tasks to true or false
     */
    setAllTasksState(checkState: boolean): void {
      // if (checkState === false)
      for (let i = 0; i < this.tasks.length; i += 1) {
        this.tasks[i].isDone = checkState;
      }
    },
    setTaskState(id: number, isDone: boolean): void {
      this.tasks.forEach((task: Task, index: number, tasks: Task[]) => {
        if (task.id === id) tasks[index].isDone = isDone;
      });
    },
  },
});

export default TodoListStore;
