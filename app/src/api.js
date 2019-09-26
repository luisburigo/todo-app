import axios from "axios";

export const apiTodo = axios.create({
    baseURL: `${process.env.VUE_APP_BASE_URL}todo`
});
