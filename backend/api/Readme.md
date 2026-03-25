# API – Bibliotheque Numerique DIT

## Role
Ce service regroupe toute la logique backend dans une seule application Fastify.
Les domaines users, books et emprunts sont dans le meme projet et exposes sur une API unique.

## Fonctionnalites
- Endpoints users: creation, liste, detail, mise a jour, suppression
- Endpoints books: creation, liste, recherche, detail, mise a jour, suppression
- Endpoints emprunts: creation, liste, historique, retards, retour
- Documentation Swagger unifiee sur /docs
- Initialisation automatique des tables PostgreSQL au demarrage

## Lancement local
Dans ce dossier:
```bash
npm install
npm start
```

## Lancement Docker
Dans ce dossier:
```bash
docker-compose up --build
```

## Configuration
Variables d'environnement dans `.env`:
- PORT
- PGHOST
- PGPORT
- PGUSER
- PGPASSWORD
- PGDATABASE

Pour l'execution locale, utiliser `PGHOST=localhost` et `PGPORT=5433` si la base tourne via Docker compose.
En execution Docker, `docker-compose.yml` surcharge automatiquement avec `PGHOST=db` et `PGPORT=5432`.

## Acces
- API: http://localhost:3000
- Healthcheck: http://localhost:3000/health
- Swagger: http://localhost:3000/docs

---
**Auteur :** Projet DevOps DIT – 2026
