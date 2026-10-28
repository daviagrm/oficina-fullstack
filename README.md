# Nome do Projeto

## Pré-requisitos

- Python 3.10+
- Node.js (versão LTS) e npm

## Backend (FastAPI)

```bash
cd backend
python -m venv .venv              # no Linux/macOS, use python3 se necessário
source .venv/bin/activate         # no Windows: .venv\Scripts\activate.ps1
pip install -r requirements.txt
fastapi dev
```

A API estará disponível em http://localhost:8000, com a documentação interativa em http://localhost:8000/docs.

## Frontend (Vite)

Em outro terminal, a partir da raiz do repositório:

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em http://localhost:5173.
