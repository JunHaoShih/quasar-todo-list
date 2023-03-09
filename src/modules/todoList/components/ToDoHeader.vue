<template>
  <q-input
    filled
    v-model="inputTask"
    label="Please enter your task and press ENTER"
    hint="Task"
    @keyup.enter="submitTask"
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TodoListStore from '../stores/todo-list-store';

@Options({})
export default class ToDoHeader extends Vue {
  todoListStore = TodoListStore();

  // You have to assign value to inputTask, or it will not be reactive
  inputTask = '';

  submitTask(event: KeyboardEvent): void {
    this.todoListStore.addTask(this.inputTask);
    this.inputTask = '';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
