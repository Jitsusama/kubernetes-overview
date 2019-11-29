import {Todo} from './logic';

export function retrieve() {
    return fetch('/api/todos')
        .then(response => response.ok
            ? response
            : response.json().then(json => Promise.reject(json)))
        .then(json => json.map(todo => new Todo(todo.uuid, todo.name)))
}

export function create(name) {
    return fetch('/api/todos', {method: 'POST', body: name})
        .then(response => response.ok
            ? null
            : Promise.reject(response.body));
}

export function remove(uuid) {
    return fetch(`/api/todos/${uuid}`, {method: 'DELETE'})
        .then(response => response.ok
            ? null
            : Promise.reject(response.body));
}
