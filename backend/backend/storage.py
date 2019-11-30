from typing import List

import sqlalchemy
from sqlalchemy import table, text

from backend.todos import Todo


# noinspection SqlNoDataSourceInspection
class Storage:
    def __init__(self, database_uri: str):
        self._db = sqlalchemy.create_engine(database_uri)

    def retrieve_todos(self) -> List[Todo]:
        return [Todo(todo[1], todo[0]) for todo in
                self._db.execute('SELECT * FROM todos')]

    def persist_todo(self, todo: Todo):
        self._db.execute(
            text('INSERT INTO todos VALUES(:uuid, :name)'),
            uuid=todo.uuid, name=todo.name)

    def delete_todo(self, uuid: str):
        self._db.execute(text('DELETE FROM todos WHERE uuid=:uuid'), uuid=uuid)
