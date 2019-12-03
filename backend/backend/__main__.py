import os
import sys

from backend.logic import Logic
from backend.server import Server
from backend.storage import Storage


# noinspection PyShadowingNames
def main(server: Server):
    server.start()


if __name__ == '__main__':
    listening_port = int(os.environ.get('LISTENING_PORT', '8080'))
    database_uri = os.environ.get('STORAGE_DB_URI')

    if not database_uri:
        print('STORAGE_DB_URI must be set for backend to run!', file=sys.stderr)
        sys.exit()

    storage = Storage(database_uri)
    logic = Logic(storage)
    server = Server(logic, listening_port)

    main(server)
