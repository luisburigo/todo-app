import {apiTodo} from "../api";

export async function allTodos() {
    const req = await apiTodo.get('/');
    return req.data;
}

export async function createTodo(todo) {
    const req = await apiTodo.post('/', todo);
    return req.data;
}

export async function updateTodo(todo) {
    const req = await apiTodo.put(`/${todo._id}`, todo);
    return req.data;
}

export async function deleteTodo(todo) {
    const req = await apiTodo.delete(`/${todo._id}`, todo);
    return req.data;
}
