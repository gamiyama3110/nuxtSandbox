<template>
  <div>
    <div class="form">
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <span v-if="todo.created">
            <input type="checkbox" v-bind:checked="todo.done" @change="toggle(todo)">
            <!-- todo.doneがtrueなら、class: doneが付与される仕組み。 -->
            <span v-bind:class="{ done: todo.done }">
              {{ todo.name }} {{ todo.created.toDate() | dateFilter }}
            </span>
            <button v-on:click="remove(todo.id)">X</button>
          </span>
        </li>
      </ul>
      <!-- buttonのsubmitでaddメソッドが呼ばれる。preventでリロキャン。
      https://jp.vuejs.org/v2/guide/events.html -->
      <form v-on:submit.prevent="add">
        <!-- dataのnameとバインドしてる。 -->
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data: function() {
    return {
      name: '',
      done: false
    };
  },
  created: function() {
    this.$store.dispatch('todos/init');
  },
  methods: {
    add() {
      // storeのメソッドを呼び出してる
      this.$store.dispatch('todos/add', this.name);
      this.name = '';
    },
    remove(id) {
      this.$store.dispatch('todos/remove', id);
    },
    toggle(todo) {
      this.$store.dispatch('todos/toggle', todo);
    }
  },
  // storeへのアクセスはcomputedを経由する。
  computed: {
    todos() {
      // storeのstate/todosまでは分かる。その後のtodosはなんだ
      return this.$store.state.todos.todos;
    }
  },
  filters: {
    dateFilter: function(date) {
      return moment(date).format('YYYY/MM/DD HH:mm:ss');
    }
  }
}
</script>

<style scoped>
li > span > span.done {
  text-decoration: line-through;
}
</style>