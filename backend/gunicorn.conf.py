name = "Gunicorn configuration for FastAPI"

bind = "0.0.0.0:8080"
worker_class = "uvicorn.workers.UvicornWorker"
workers = 1
timeout = 600