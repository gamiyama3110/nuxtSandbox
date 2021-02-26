// defaultはカッコなしで任意の名前でimportできる
// https://qiita.com/ozaki25/items/9723cb3c1c72845157d5#%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB
import firebasedayo from '~/plugins/myfirebase.js';
// 通常のexportはカッコ付けてimportする
// as句で名前を変えられる
import { firestoreAction as action } from 'vuexfire';

const db = firebasedayo.firestore();
const todosRef = db.collection('todos-db');
export const state = () => ({
  todos: []
})

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