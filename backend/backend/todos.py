from dataclasses import dataclass, field
from uuid import uuid4


@dataclass
class Todo:
    name: str
    uuid: str = field(default_factory=lambda: str(uuid4()))
