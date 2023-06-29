.PHONY: app-cli
app-cli:
	@docker exec -it sb-backend bash

.PHONY: format
format:
	@poetry run black app/
	@poetry run isort app/

.PHONY: lint
lint:
	@poetry run black --check app/ --diff
	@poetry run isort --check-only app/
	@poetry run mypy app/
