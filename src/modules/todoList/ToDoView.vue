<template>
  <div id="todo-container">
    <ToDoHeader/>
    <ToDoList/>
    <ToDoFooter/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import ToDoHeader from './components/ToDoHeader.vue';
import TodoListStore from './stores/todo-list-store';
import { Task } from './stores/task-model';
import ToDoFooter from './components/ToDoFooter.vue';
import ToDoList from './components/ToDoList.vue';

@Options({
  components: {
    ToDoHeader,
    ToDoFooter,
    ToDoList,
  },
})
export default class ToDoView extends Vue {
  todoListStore = TodoListStore();

  created(): void {
    const localTasks: string | null = localStorage.getItem('todoTasks');
    if (localTasks) {
      this.todoListStore.tasks = JSON.parse(localTasks!);
    }
  }

  @Watch('todoListStore.tasks', { deep: true })
  onTasksChanged(newTasks: Task[], oldTasks: Task[]) {
    localStorage.setItem('todoTasks', JSON.stringify(this.todoListStore.tasks));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
