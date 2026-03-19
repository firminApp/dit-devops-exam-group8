# Bibliotheque Numerique DIT - Backend

## Presentation
Le backend utilise desormais une architecture monolithique:
un seul service API dans `backend/api` gere users, books et emprunts.

## Structure du projet
```
backend/
  api/            # API monolithique (Fastify)
  microservices/  # Ancienne architecture, non utilisee
```

## Prerequis
- Docker et Docker Compose
- Node.js (pour lancement hors Docker)

## Lancement rapide (recommande)
Dans le dossier `backend/api`:
```bash
docker-compose up --build
```

Services demarres:
- PostgreSQL sur `localhost:5433`
- API monolithique sur `localhost:3000`

## Acces
- API: http://localhost:3000
- Swagger: http://localhost:3000/docs
- Healthcheck: http://localhost:3000/health

## Arret
Dans `backend/api`:
```bash
docker-compose down
```

## Initialisation des tables
Les tables sont creees automatiquement au demarrage de l'API.
Initialisation manuelle possible:
```bash
cd backend/api
npm run initdb
```

## Variables d'environnement
Configuration dans `backend/api/.env`:
- `PORT`
- `PGHOST`
- `PGPORT`
- `PGUSER`
- `PGPASSWORD`
- `PGDATABASE`

## Technologies
- Node.js (Fastify)
- PostgreSQL
- Docker, Docker Compose
- Swagger (OpenAPI)

---

**Auteur :** Projet DevOps DIT - 2026
