import { client } from './client.js';

export async function getAllTodos() {
    // get all the todos
    const response = await client 
        .from('todos')
        .select();

    return response.data;
}

export async function createTodo(todo) {
    const response = await client
        .from('todos')
        .insert(todo)
        .single();

    return response.data;
}

export async function updateTodo(todo) {
    const response = await client
        .from('todos')
        .update(todo)
        .eq('id', todo.id)
        .single();

    return response.data;
}

export async function deleteTodo(todo) {
    const response = await client
        .from('todos')
        .delete()
        .eq('id', todo.id)
        .single();

    return response.data;
}