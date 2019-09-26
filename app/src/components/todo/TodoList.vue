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
        <template v-else>
            Nenhuma Todo cadastrada
        </template>
    </v-list-item-group>
</template>

<script>
    import {mapMutations, mapGetters} from "vuex";
    import Todo from "./Todo";

    export default {
        name: "TodoList",
        props: ['todos'],
        components: {Todo},
        methods: {
            ...mapMutations(['setTodo']),
            openModal(todo) {
                this.$emit('openDialog', {...todo})
            }
        },
        computed: {

        },

    }
</script>

<style scoped>

</style>
