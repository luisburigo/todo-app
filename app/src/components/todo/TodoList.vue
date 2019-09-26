<template>
    <v-list-item-group>
        <template v-if="todos.length > 0">
            <v-list-item :key="key"
                         :two-line="!!todo.description"
                         @click="openModal(todo)"
                         v-for="(todo, key) in todos">
                <Todo :todo="todo"/>
            </v-list-item>
        </template>
        <div class="empty" v-else>
            {{messageEmpty}}
        </div>
    </v-list-item-group>
</template>

<script>
    import {mapMutations} from "vuex";
    import Todo from "./Todo";

    export default {
        name: "TodoList",
        props: ['todos', 'messageEmpty'],
        components: {Todo},
        methods: {
            ...mapMutations(['setTodo']),
            openModal(todo) {
                this.$emit('openDialog', {...todo})
            }
        },
    }
</script>

<style scoped>
    .empty {
        padding: 15px 15px 0;
        text-align: center;
    }
</style>
