VENV := ../venv
UVICORN := $(VENV)/bin/uvicorn
PIP := $(VENV)/bin/pip

.PHONY: dev install

dev:
	$(UVICORN) main:app --host 0.0.0.0 --port 8000

install:
	$(PIP) install -r requirements.txt
