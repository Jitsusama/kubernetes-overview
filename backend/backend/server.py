import uvicorn
from flask import Flask, Response, jsonify, request

from backend.logic import Logic
from backend.todos import Todo


def create_service_entrypoint(logic: Logic) -> Flask:
    service_entrypoint = Flask(__name__)

    @service_entrypoint.route('/todos', methods=['GET'])
    def get_todos() -> Response:
        return jsonify(logic.retrieve_todos())

    @service_entrypoint.route('/todos', methods=['POST'])
    def create_todo() -> Response:
        name = request.data.decode('utf8')
        todo = Todo(name)
        logic.create_todo(todo)

        return Response(status=204)

    @service_entrypoint.route('/todos/<string:uuid>', methods=['DELETE'])
    def delete_todo(uuid: str):
        logic.delete_todo(uuid)

        return Response(status=204)

    @service_entrypoint.route('/healthy')
    def health_check():
        return Response(status=204)

    return service_entrypoint


class Server:
    def __init__(self, logic: Logic, port: int):
        self.logic = logic
        self.port = port

    def start(self):
        service_entrypoint = create_service_entrypoint(self.logic)
        uvicorn.run(service_entrypoint, host='0.0.0.0', port=self.port, interface='wsgi')
