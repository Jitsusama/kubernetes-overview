import React, {Fragment, useEffect, useState} from 'react';
import {addTodo, deleteTodo, retrieveTodos} from './logic';
import uiStyle from './ui.css';

function Form({afterAdd, onError}) {
    let [name, setName] = useState('');

    const changeName = event => setName(event.target.value);
    const submitForm = event => {
        event.preventDefault();
        addTodo(name).then(() => {
            setName('');
            afterAdd();
            onError(undefined);
        }).catch(onError);
    };

    return <form onSubmit={submitForm} className={uiStyle.addTodo}>
        <label>add todo <input
            type="text" name="todo" onChange={changeName} value={name}/></label>
        <button>+</button>
    </form>;
}

function List({todos, error, afterDelete, onDeleteError}) {
    if (error) return <Error message={error}/>;
    if (todos) return <ul className={uiStyle.todoList}>{todos.map(todo =>
        <Item todo={todo} afterDelete={afterDelete}
              onError={onDeleteError}/>)}</ul>;
    return <Fragment/>;
}

function Item({todo, afterDelete, onError}) {
    const onDelete = (event, uuid) => {
        event.preventDefault();
        deleteTodo(uuid).then(() => {
            afterDelete();
            onError(undefined);
        }).catch(onError);
    };

    return <li className={uiStyle.todoItem}>{todo.name}
        <button onClick={event => onDelete(event, todo.uuid)}>-</button>
    </li>;
}

function Error({message}) {
    return message ? <p className={uiStyle.error}>{message}</p> : <Fragment/>;
}

export function App() {
    let [todos, setTodos] = useState([]);
    let [addError, setAddError] = useState(undefined);
    let [listError, setListError] = useState(undefined);

    const updateTodos = () => {
        retrieveTodos()
            .then(setTodos)
            .then(() => setListError(undefined))
            .catch(setListError);
    };
    useEffect(() => updateTodos(), []);

    return <main className={uiStyle.main}>
        <Form afterAdd={updateTodos} onError={setAddError}/>
        <Error message={addError}/>
        <List todos={todos} error={listError} afterDelete={updateTodos}/>
    </main>;
}
