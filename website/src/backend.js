import {Todo} from './logic';

export function retrieve() {
    return fetch('/todos')
        .then(response => response.ok
            ? response
            : response.json().then(json => Promise.reject(json)))
        .then(json => json.map(todo => new Todo(todo.uuid, todo.name)))
}

export function create(name) {
    return fetch('/todos', {method: 'POST', body: name})
        .then(response => response.ok
            ? null
            : Promise.reject(response.body));
}

export function remove(uuid) {
    return fetch(`/todos/${uuid}`, {method: 'DELETE'})
        .then(response => response.ok
            ? null
            : Promise.reject(response.body));
}
