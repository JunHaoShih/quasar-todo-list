<template>
  <q-footer>
    <q-toolbar>
      <q-toolbar-title>完成 {{ todoListStore.finishedCount }} 項
        / 共 {{ todoListStore.totalCount }} 項</q-toolbar-title>
      <q-btn color="deep-orange" glossy label="Remove Complete Tasks"
        @click="onRemoveClicked" />
    </q-toolbar>
  </q-footer>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TodoListStore from '../stores/todo-list-store';

@Options({
  props: {
    finishedCount: Number,
    totalCount: Number,
  },
})
export default class ToDoFooter extends Vue {
  todoListStore = TodoListStore();

  onRemoveClicked(): void {
    this.todoListStore.removeCompleteTasks();
  }
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
