NAME := showball

.PHONY: build
build:
	docker compose -p $(NAME) build --no-cache $(s)

.PHONY: up
up:
	docker compose -p $(NAME) up -d $(s)

.PHONY: down
down:
	docker compose -p $(NAME) down $(s)

.PHONY: start
start:
	docker compose -p $(NAME) start $(s)

.PHONY: stop
stop:
	docker compose -p $(NAME) stop $(s)
