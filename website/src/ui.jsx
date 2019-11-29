import React, {Fragment, useEffect, useState} from 'react';
import {addTodo, deleteTodo, retrieveTodos} from './logic';

function Form({afterAdd, onError}) {
    let [name, setName] = useState('');

    const changeName = event => setName(event.target.value);
    const submitForm = event => {
        event.preventDefault();
        addTodo(name).then(afterAdd).catch(onError);
    };

    return <form onSubmit={submitForm}>
        <label>add todo <input
            type="text" name="todo" onChange={changeName} value={name}/></label>
        <button>+</button>
    </form>;
}

function List({todos, error, afterDelete, onDeleteError}) {
    if (error) return <b>{error}</b>;
    if (todos) return <ul>{todos.map(todo =>
        <Item todo={todo} afterDelete={afterDelete}
              onError={onDeleteError}/>)}</ul>;
    return <Fragment/>;
}

function Item({todo, afterDelete, onError}) {
    const onDelete = (event, uuid) => {
        event.preventDefault();
        deleteTodo(uuid).then(afterDelete).catch(onError);
    };

    return <li>{todo.name}
        <button onClick={event => onDelete(event, todo.uuid)}>X</button>
    </li>;
}

export function App() {
    let [todos, setTodos] = useState([]);
    let [addError, setAddError] = useState(undefined);
    let [listError, setListError] = useState(undefined);

    const updateTodos = () => {
        retrieveTodos().then(setTodos).catch(setListError);
    };
    useEffect(() => updateTodos());

    return <main>
        <Form afterAdd={updateTodos} onError={setAddError}/>
        {addError ? <p><b>{addError}</b></p> : null}
        <List todos={todos} error={listError} afterDelete={updateTodos}/>
    </main>;
}
