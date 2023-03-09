<template>
  <div>
    <q-table
      title="Task list"
      :rows="todoListStore.tasks"
      :columns="columns"
      row-key="id"
      selection="multiple"
      v-model:selected="selected">
      <template v-slot:top>
        <q-btn color="primary" label="Set as done" @click="setTasksState(true)" />
        <q-btn color="primary" label="Undone tasks" @click="setTasksState(true)" />
        <q-space />
      </template>
      <template v-slot:body-cell-isDone="props">
        <q-td :props="props">
          <q-checkbox disable v-model="props.value" />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense round flat @click="editTask(props.row as Task)"
            color="grey" icon="edit"></q-btn>
          <q-btn dense round flat @click="deleteTask(props.row as Task)"
            color="grey" icon="delete"></q-btn>
        </q-td>
      </template>
  </q-table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { QTableProps } from 'quasar';
import { Task } from '../stores/task-model';
import TodoListStore from '../stores/todo-list-store';

@Options({})
export default class ToDoList extends Vue {
  todoListStore = TodoListStore();

  selected = [] as Task[];

  columns: QTableProps['columns'] = [
    {
      name: 'id', align: 'left', label: 'Id', field: 'id', sortable: true, style: 'width:20px',
    },
    {
      name: 'taskName',
      required: true,
      label: 'Task name',
      align: 'left',
      field: 'taskName',
      sortable: true,
    },
    {
      name: 'isDone', label: 'Done', field: 'isDone', align: 'center',
    },
    {
      name: 'actions', label: 'Actions', field: '', align: 'center',
    },
  ];

  editTask(task: Task) {
    this.todoListStore.setTaskState(task.id, !task.isDone);
  }

  deleteTask(task: Task) {
    this.todoListStore.removeTask(task.id);
  }

  setTasksState(isDone: boolean): void {
    this.selected.forEach((task: Task, index: number, tasks: Task[]) => {
      this.todoListStore.setTaskState(task.id, !task.isDone);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
