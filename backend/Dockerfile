FROM python:3.10-bullseye

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

EXPOSE 8080

WORKDIR /app

COPY ./poetry.lock ./pyproject.toml ./

RUN pip install poetry==1.5.1 && \
    poetry config virtualenvs.create false && \
    poetry install --without dev --no-interaction --no-ansi

COPY . ./

CMD poetry run gunicorn --config gunicorn.conf.py app.main:app