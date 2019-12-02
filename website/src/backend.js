import {Todo} from './logic';

export const retrieve = () =>
    fetch('/todos')
        .then(response => response.ok
            ? response.json()
            : response.json().then(json => Promise.reject(json)))
        .then(json => json.map(todo => new Todo(todo.uuid, todo.name)));

export const create = name =>
    fetch('/todos', {method: 'POST', body: name})
        .then(response => response.ok
            ? null
            : Promise.reject(response.body));

export const remove = uuid =>
    fetch(`/todos/${uuid}`, {method: 'DELETE'})
        .then(response => response.ok
            ? null
            : Promise.reject(response.body));
