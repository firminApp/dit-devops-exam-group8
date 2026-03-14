# API Gateway – Bibliothèque Numérique DIT

## Rôle
L’API Gateway centralise et sécurise l’accès à tous les microservices (users, books, emprunts). Elle agit comme point d’entrée unique pour le frontend et les clients externes.

## Fonctionnalités
- Proxy vers chaque microservice via Fastify et http-proxy
- Centralisation de la documentation Swagger (/docs)
- Gestion des CORS
- Facilité d’extension (authentification, rate limiting, etc.)

## Lancement
Dans ce dossier :
```bash
npm install
npm start
```

Ou via Docker Compose (recommandé, voir Readme principal).

## Configuration
- Variables d’environnement dans `.env` (ports, URLs des microservices)
- Personnalisation possible des routes, sécurité, etc.

## Accès
- API Gateway : http://localhost:3000
- Docs centralisées : http://localhost:3000/docs

---
**Auteur :** Projet DevOps DIT – 2026
