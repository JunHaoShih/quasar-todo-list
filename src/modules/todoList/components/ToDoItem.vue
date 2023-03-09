<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700
    hover:bg-gray-50 dark:hover:bg-gray-600">
    <td class="w-4 p-4">
      <div class="flex items-center">
        <label v-bind:for="task.id.toString()" class="">
          <input v-bind:id="task.id.toString()" type="checkbox" value="" v-model="task.isDone"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
              focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800
              dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        </label>
      </div>
    </td>
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {{ task.taskName }}
    </th>
    <td class="flex items-center px-6 py-4 space-x-3">
      <button type="button" class="text-white
      bg-red-700 hover:bg-red-800 focus:outline-none
      focus:ring-4  focus:ring-red-300 font-medium rounded-full
      text-sm px-5 py-2.5 text-center mb-2
      dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      @click="onRemoveClicked">Remove</button>
    </td>
  </tr>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Options, Vue } from 'vue-class-component';
import TodoListStore from '../stores/todo-list-store';
import { Task } from '../stores/task-model';

@Options({
  props: {
    task: Object as PropType<Task>,
  },
})
export default class ToDoItem extends Vue {
  task!: Task;

  todoListStore = TodoListStore();

  onRemoveClicked(event: MouseEvent) {
    if (window.confirm(`Are you sure you want to delete ${this.task.taskName} ?`)) {
      this.todoListStore.removeTask(this.task.id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
