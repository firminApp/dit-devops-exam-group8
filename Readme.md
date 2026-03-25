# Bibliotheque Numerique DIT - Projet Complet

## Presentation
Ce projet fournit une plateforme complete de gestion de bibliotheque academique avec :
- un backend  Fastify (users, books, emprunts)
- un frontend React
- une base PostgreSQL
- une interface d administration pgAdmin

## Architecture Generale
```
backend/
  api/            # API  Fastify
frontend/         # Application React (Vite)
devops/           # Orchestration Docker Compose
db/               # Donnees persistantes PostgreSQL (volume Docker)
```

## Cote DevOps
- Conteneurisation avec Docker
- Orchestration centralisee avec [devops/docker-compose.yml](devops/docker-compose.yml)
- API configuree via [backend/api/.env](backend/api/.env)
- Healthcheck PostgreSQL pour garantir que la DB est prete avant l API et pgAdmin

## Demarrage du projet
1. Prerequis :
   - Docker
   - Docker Compose
2. Lancement (recommande) :

```bash
cd devops
docker compose up --build
```

Alternative compatible :

```bash
cd devops
docker-compose up --build
```

## Acces
- Frontend : http://localhost:8080
- API : http://localhost:3000
- Swagger : http://localhost:3000/docs
- Healthcheck : http://localhost:3000/health
- PostgreSQL : localhost:5433
- pgAdmin : http://localhost:5050

## Acces pgAdmin
- Email : admin@gmail.com
- Mot de passe : admin1234

Configuration serveur PostgreSQL dans pgAdmin :
- Host : db
- Port : 5432
- User : admin
- Password : admin123
- Database : librarydb

## Backend
Toutes les routes sont servies par un seul process :
- /users
- /books
- /emprunts

Les tables SQL sont creees automatiquement au demarrage de l API.

## Frontend
Le frontend React consomme l API Fastify.

Variable frontend disponible dans [frontend/.env](frontend/.env) :
- VITE_API_BASE_URL=http://localhost:3000

## Arret
Depuis [devops](devops) :

```bash
docker compose down
```

Pour supprimer les volumes :

```bash
docker compose down -v
```

## Documentation detaillee
- [Backend API](backend/api/Readme.md)
- [Frontend](frontend/README.md)
- [DevOps](devops/Readme.md)

---

Auteur : Projet DevOps DIT - 2026
