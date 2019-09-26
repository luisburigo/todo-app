import Vue from 'vue'
import Vuex from 'vuex'
import {allTodos, createTodo, deleteTodo, updateTodo} from "./services/todo.service";
import {TODO_STATUS} from "./constants";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: [],
        todo: {},
        requestState: {
            creating: false,
            updating: false,
            deleting: false
        }
    },
    mutations: {
        setTodos(state, todos) {
            state.todos = todos;
        },
        setTodo(state, todo) {
            state.todo = todo;
        },
        clearTodo(state) {
            state.todo = {};
        },
        creatingTodo(state, status) {
            state.requestState.creating = status
        },
        updatingTodo(state, status) {
            state.requestState.updating = status
        },
        deletingTodo(state, status) {
            state.requestState.deleting = status
        }
    },
    actions: {
        async allTodos({commit}) {
            const todos = await allTodos();
            commit('setTodos', todos);
        },
        async createTodo({state, commit, dispatch}) {
            commit('creatingTodo', true);
            await createTodo(state.todo);
            commit('creatingTodo', false);
            commit('clearTodo');
            await dispatch('allTodos');
        },
        async updateTodo({commit, dispatch}, todo) {
            commit('updatingTodo', true);
            await updateTodo(todo);
            commit('updatingTodo', false);
            commit('clearTodo');
            await dispatch('allTodos');
        },
        async deleteTodo({commit, dispatch}, todo) {
            commit('deletingTodo', true);
            await deleteTodo(todo);
            commit('deletingTodo', false);
            await dispatch('allTodos');
        }
    },
    getters: {
        todos: state => state.todos,
        todo: state => state.todo,
        workingTodos: state => state.todos.filter(todo => todo.status === TODO_STATUS.WORKING),
        completedTodos: state => state.todos.filter(todo => todo.status === TODO_STATUS.COMPLETED),
    }
})
