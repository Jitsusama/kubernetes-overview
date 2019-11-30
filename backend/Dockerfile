FROM python:3.7-alpine AS requirements

WORKDIR /build
RUN apk add --no-cache build-base && pip install --no-cache-dir pipenv
COPY ./Pipfile ./Pipfile.lock ./
RUN pipenv lock -r > requirements.txt
RUN pip wheel -r requirements.txt --wheel-dir wheels

FROM python:3.7-alpine AS app

WORKDIR /app
COPY --from=requirements /build/wheels/ ./wheels/
RUN pip install --no-cache-dir wheels/*
COPY backend/ ./backend/

ENTRYPOINT ["python", "-m", "backend"]
