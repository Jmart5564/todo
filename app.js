import { getUser, signOut } from './services/auth-service.js';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from './services/todo-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import createTodos from './components/Todos.js';
import createAddTodo from './components/AddTodo.js';

// State
let user = null;
let todos = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    todos = await getAllTodos();

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleAdd(task) {
    const todo = await createTodo({
        description: task,
        complete: false
    });
    todos.push(todo);

    display();
}

async function handleComplete(todo) {
    todo.complete = !todo.complete;
    const index = todos.indexOf(todo);
    todos[index] = await updateTodo(todo);

    display();
}

async function handleEdit(todo, task) {
    todo.description = task;
    const index = todos.indexOf(todo);
    todo[index] = await updateTodo(todo);

    display();
}

async function handleDelete(todo) {
    const index = todos.indexOf(todo);
    await deleteTodo(todo);
    todos.splice(index, 1);

    display();
}

const Todos = createTodos(document.querySelector('.todo-list'), {
    handleComplete,
    handleEdit,
    handleDelete
});

const AddTodo = createAddTodo(document.querySelector('.new-todo'), { handleAdd });

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

function display() {
    User({ user });
    Todos({ todos });
    AddTodo();
}

handlePageLoad();
