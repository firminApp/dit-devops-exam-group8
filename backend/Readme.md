# Bibliothèque Numérique DIT – Backend

## Présentation
Ce projet backend met en œuvre une architecture microservices pour la gestion d’une bibliothèque académique (livres, utilisateurs, emprunts) avec Node.js, Fastify, PostgreSQL, Docker et une API Gateway.

## Structure du projet
```
backend/
  api/           # API Gateway (orchestration)
  microservices/
    users/       # Microservice gestion des utilisateurs
    books/       # Microservice gestion des livres
    emprunts/    # Microservice gestion des emprunts
```

## Prérequis
- Docker & Docker Compose
- Node.js (pour développement local hors Docker)

## Lancement rapide (recommandé)
Dans le dossier `backend/api` :
```bash
docker-compose up --build
```
- Base PostgreSQL sur le port 5433
- Microservices users (3001), books (3002), emprunts (3003)
- API Gateway sur le port 3000

## Accès aux services
- API Gateway : http://localhost:3000
- Docs Swagger :
  - Users : http://localhost:3001/docs
  - Books : http://localhost:3002/docs
  - Emprunts : http://localhost:3003/docs
  - Liens centralisés : http://localhost:3000/docs

## Arrêt des services
Dans `backend/api` :
```bash
docker-compose down
```

## Initialisation manuelle des tables (hors Docker)
Dans `backend/microservices` :
```bash
sh init_all_tables.sh
```

## Variables d’environnement
Chaque microservice possède un fichier `.env` (voir exemples dans chaque dossier).

## Fonctionnalités principales
- **Users** : création, liste, profil, types d’utilisateurs
- **Books** : ajout, modification, suppression, recherche, liste
- **Emprunts** : emprunter, retourner, historique, détection des retards
- **API Gateway** : point d’entrée unique, proxy vers chaque microservice

## Technologies
- Node.js (Fastify)
- PostgreSQL
- Docker, Docker Compose
- Swagger (OpenAPI)

## Dépannage
- Si le port 5433 est déjà utilisé, modifiez-le dans `docker-compose.yml` et tous les `.env`.
- Vérifiez que tous les services sont bien lancés avant d’utiliser l’API Gateway.

---

**Auteur :** Projet DevOps DIT – 2026
