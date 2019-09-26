<template>
    <div class="container container--fluid">
        <v-layout row wrap>
            <v-flex xs9>
                <v-text-field
                        :disabled="creatingTodo"
                        v-model="todo.name"
                        label="Nome"
                        outlined
                        clearable
                ></v-text-field>
            </v-flex>
            <v-flex xs3
                    class="pl-2">
                <v-btn
                        @click="createTodo"
                        :disabled="!todo.name"
                        :loading="creatingTodo"
                        class="todo-form__button"
                        color="primary"
                        depressed
                        height="56px"
                        block
                >
                   Criar
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: "TodoForm",
        created() {
            this.allTodos();
        },
        methods: {
            ...mapActions(['allTodos', 'createTodo'])
        },
        computed: {
            ...mapState({
                todo: state => state.todo,
                creatingTodo: state => state.requestState.creating
            }),
        }
    }
</script>

<style lang="scss" scoped>
    .todo-form {
        .row {
            margin: 0;
        }
    }
</style>
