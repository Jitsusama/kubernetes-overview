import {create, remove, retrieve} from './backend';

export class Todo {
    constructor(uuid, name) {
        this.uuid = uuid;
        this.name = name;
    }
}

export function retrieveTodos() {
    return retrieve().catch(reason => {
        console.error('Retrieve Error:', reason);
        return Promise.reject('Encountered an error while retrieving todos.');
    });
}

export function addTodo(name) {
    return create(name).catch(reason => {
        console.error('Add Error:', reason);
        return Promise.reject('Encountered an error while adding a todo.');
    });
}

export function deleteTodo(uuid) {
    return remove(uuid).catch(reason => {
        console.error('Delete Error:', reason);
        return Promise.reject('Encountered an error while deleting a todo.');
    });
}
