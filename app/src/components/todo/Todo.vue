<template>
    <v-list-item-content>
        <v-list-item-title>
            <div class="todo">
                <div class="todo__name" :class="{completed: todo.status === TODO_STATUS.COMPLETED}">
                    <span class="todo__text">
                        {{ todo.name }}
                    </span>
                    <v-chip outlined :color="color" x-small class="ml-3">
                        {{status}}
                    </v-chip>
                </div>
                <div class="todo__buttons">
                    <v-btn
                            @click.prevent.stop="workTodo(todo)"
                            elevation="1"
                            color="primary"
                            small
                            v-if="todo.status === TODO_STATUS.NOT_COMPLETED"
                            class="mr-2">
                        Work
                    </v-btn>
                    <v-btn
                            @click.prevent.stop="compleTodo(todo)"
                            elevation="1"
                            color="success"
                            small
                            v-if="todo.status === TODO_STATUS.WORKING"
                           class="mr-2">
                        Complete
                    </v-btn>
                    <v-btn @click.prevent.stop="deleteTodo(todo)" color="error" fab x-small outlined>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-list-item-title>
        <v-list-item-subtitle v-if="todo.description">
            {{todo.description}}
        </v-list-item-subtitle>
    </v-list-item-content>
</template>

<script>
    import {TODO_STATUS} from "../../constants";
    import {mapActions} from "vuex";

    export default {
        name: "Todo",
        props: ['todo'],
        data() {
            return {
                TODO_STATUS
            }
        },
        methods: {
            ...mapActions(['deleteTodo', 'updateTodo']),
            compleTodo() {
                this.todo.status = TODO_STATUS.COMPLETED;
                this.updateTodo(this.todo);
            },
            workTodo() {
                this.todo.status = TODO_STATUS.WORKING;
                this.updateTodo(this.todo);
            }
        },
        computed: {
            status() {
                switch (this.todo.status) {
                    case TODO_STATUS.NOT_COMPLETED:
                        return 'Not completed';
                    case TODO_STATUS.COMPLETED:
                        return 'Completed';
                    case TODO_STATUS.WORKING:
                        return 'Working';
                }

                return '';
            },
            color() {
                switch (this.todo.status) {
                    case TODO_STATUS.NOT_COMPLETED:
                        return 'warning';
                    case TODO_STATUS.COMPLETED:
                        return 'success';
                    case TODO_STATUS.WORKING:
                        return 'primary';
                }

                return '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .todo {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__name.completed &__text {
            color: grey;
            text-decoration-line: line-through;
        }
    }
</style>
