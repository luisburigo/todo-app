<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title>Todo list</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <TodoForm/>
                                <TodoList @openDialog="openDialog"/>

                                <!-- Modal edit Todo -->
                                <v-dialog v-model="dialog" width="500" persistent>
                                    <v-card>
                                        <v-card-title>
                                            Editar todo
                                        </v-card-title>
                                        <v-card-text>
                                            <v-text-field outlined
                                                          v-model="todo.name"
                                                          label="Nome"/>
                                            <v-text-field outlined
                                                          v-model="todo.description"
                                                          label="Descrição"/>
                                            <v-btn-toggle v-model="todo.status">
                                                <v-btn :value="TODO_STATUS.WORKING" color="primary" text small>
                                                    Working
                                                </v-btn>
                                                <v-btn :value="TODO_STATUS.COMPLETED" color="success" text small>
                                                    Completed
                                                </v-btn>
                                                <v-btn :value="TODO_STATUS.NOT_COMPLETED" color="warning" text small>
                                                    Not completed
                                                </v-btn>
                                            </v-btn-toggle>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                    :loading="updatingTodo"
                                                    color="primary"
                                                    @click="editTodo"
                                            >
                                                Editar
                                            </v-btn>
                                            <v-btn
                                                    color="error"
                                                    @click="dialog = false"
                                            >
                                                Cancelar
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import TodoForm from './components/todo/TodoForm';
    import TodoList from "./components/todo/TodoList";
    import {mapActions, mapState} from "vuex";
    import {TODO_STATUS} from "./constants";

    export default {
        name: 'App',
        components: {
            TodoList,
            TodoForm,
        },
        data() {
            return {
                dialog: false,
                todo: {},
                TODO_STATUS
            }
        },
        methods: {
            ...mapActions(['updateTodo']),
            openDialog(todo) {
                this.dialog = true;
                this.todo = todo;
            },
            async editTodo() {
                await this.updateTodo(this.todo);
                this.dialog = false;
            }
        },
        computed: {
            ...mapState({
                updatingTodo: state => state.requestState.updating
            })
        }
    };
</script>
