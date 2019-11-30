from typing import List

from backend.storage import Storage
from backend.todos import Todo


class Logic:
    def __init__(self, storage: Storage):
        self.storage = storage

    def retrieve_todos(self) -> List[Todo]:
        return self.storage.retrieve_todos()

    def create_todo(self, todo: Todo):
        self.storage.persist_todo(todo)

    def delete_todo(self, uuid: str):
        self.storage.delete_todo(uuid)
