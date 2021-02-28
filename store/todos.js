// defaultはカッコなしで任意の名前でimportできる
// https://qiita.com/ozaki25/items/9723cb3c1c72845157d5#%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB
import firebasedayo from '~/plugins/myfirebase.js';
// 通常のexportはカッコ付けてimportする
// as句で名前を変えられる
import { firestoreAction as action } from 'vuexfire';
// import _ from 'lodash';

const db = firebasedayo.firestore();
const todosRef = db.collection('todos-db');
export const state = () => ({
  todos: [],
  sortAsc: false,
  sortOrders: ['created'],
})

export const mutations = {
  toggleSortAsc: function(state) {
    state.sortAsc = !state.sortAsc;
  },
  addSortOrder: function(state, order) {
    console.log('add: ' + order);

    if (!order.trim() || state.sortOrders.some(e => e === order)) {
      return;
    }
    // 順序が微妙
    state.sortOrders.unshift(order);
  },
  removeSortOrder: function(state, order) {
    console.log('remove: ' + order);
    state.sortOrders = state.sortOrders.filter(e => e !== order);
  }
}

export const actions = {
  init: action(({ bindFirestoreRef }) => {
    // todosの配列をDBにバインドする
    bindFirestoreRef('todos', todosRef);
  }),
  add: action((context, name) => {
    if(name.trim()) {
      todosRef.add({
        name: name,
        done: false,
        created: firebasedayo.firestore.FieldValue.serverTimestamp()
      });
    }
  }),
  remove: action((context, id) => {
    todosRef.doc(id).delete();
  }),
  toggle: action((context, todo) => {
    todosRef.doc(todo.id).update({
      done: !todo.done
    });
  })
}

export const getters = {
  orderdTodos: state => {
    const sortedOrders = _.sortBy(state.todos, state.sortOrders);
    if (!state.sortAsc) {
      return sortedOrders.reverse();
    }
    return sortedOrders;
  }
}

