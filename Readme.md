# Bibliotheque Numerique DIT - Projet Complet

## Presentation
Ce projet fournit une plateforme de gestion de bibliotheque academique avec:
- un backend monolithique Fastify (users, books, emprunts)
- une base PostgreSQL
- un frontend (a venir)

## Architecture Generale
```
backend/
  api/            # API monolithique (point d'entree unique)
  microservices/  # Ancienne architecture, conservee mais non utilisee
frontend/         # Application web (a implementer)
db/               # Donnees persistantes PostgreSQL (via Docker)
```

## Cote DevOps
- Conteneurisation via Docker
- Orchestration avec `backend/api/docker-compose.yml`
- Variables d'environnement dans `backend/api/.env`
- Documentation Swagger unifiee dans l'API monolithique

## Demarrage du projet
1. Prerequis:
   - Docker et Docker Compose
   - Node.js (optionnel pour execution hors Docker)
2. Lancement (recommande):
```bash
cd backend/api
docker-compose up --build
```
3. Acces:
   - API: http://localhost:3000
   - Swagger: http://localhost:3000/docs
   - Healthcheck: http://localhost:3000/health
4. Arret:
```bash
docker-compose down
```

## Backend
Toutes les routes sont servies par un seul process:
- `/users`
- `/books`
- `/emprunts`

Les tables SQL sont creees automatiquement au demarrage de l'API.

## Frontend (a venir)
- Le dossier `frontend/` accueillera l'application web cliente.
- Le frontend consommera l'API sur `http://localhost:3000`.

## Documentation detaillee
- [Backend API](backend/api/Readme.md)
- [Frontend](frontend/README.md)

---

**Auteur :** Projet DevOps DIT - 2026
