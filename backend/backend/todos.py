from dataclasses import dataclass
from uuid import uuid4


@dataclass
class Todo:
    name: str
    uuid: str = str(uuid4())
