# Bibliothèque Numérique DIT – Projet Complet

## Présentation
Ce projet met en œuvre une plateforme de gestion de bibliothèque académique basée sur une architecture microservices, avec une API Gateway, une base de données PostgreSQL, et un frontend moderne (à venir). L’ensemble est orchestré et industrialisé avec Docker, Docker Compose et une approche DevOps.

## Architecture Générale
```
backend/
  api/           # API Gateway (orchestration, point d’entrée unique)
  microservices/
    users/       # Microservice gestion des utilisateurs
    books/       # Microservice gestion des livres
    emprunts/    # Microservice gestion des emprunts
frontend/        # Application web (React, Angular, ou Vue – à implémenter)
db/              # Données persistantes PostgreSQL (via Docker)
```

- **API Gateway** : Route et sécurise toutes les requêtes vers les microservices.
- **Microservices** : Chaque domaine métier (utilisateurs, livres, emprunts) est isolé, scalable et documenté (Swagger).
- **Base de données** : PostgreSQL, partagée entre les microservices.
- **Frontend** : (à venir) Application web moderne pour les utilisateurs finaux.

## Côté DevOps
- **Conteneurisation** : Chaque composant (API, microservices, DB) possède son Dockerfile.
- **Orchestration** : Un fichier `docker-compose.yml` permet de lancer l’ensemble de l’architecture en une seule commande.
- **Variables d’environnement** : Centralisées dans des fichiers `.env` pour chaque service.
- **Documentation API** : Swagger disponible pour chaque microservice et centralisé via l’API Gateway.
- **Automatisation** : Script d’initialisation des tables SQL, gestion des dépendances, et guide de démarrage.
- **CI/CD** : (à implémenter) Pipeline Jenkins ou GitHub Actions pour build, tests, et déploiement automatisé.

## Démarrage de l’ensemble du projet
1. **Prérequis**
   - Docker & Docker Compose
   - Node.js (pour développement local ou tests hors Docker)

2. **Lancement complet (recommandé)**
   Dans le dossier `backend/api` :
   ```bash
   docker-compose up --build
   ```
   - PostgreSQL sur le port 5433
   - Microservices users (3001), books (3002), emprunts (3003)
   - API Gateway sur le port 3000

3. **Accès aux services**
   - API Gateway : http://localhost:3000
   - Docs Swagger :
     - Users : http://localhost:3001/docs
     - Books : http://localhost:3002/docs
     - Emprunts : http://localhost:3003/docs
     - Liens centralisés : http://localhost:3000/docs

4. **Arrêt de l’ensemble**
   ```bash
   docker-compose down
   ```

5. **Initialisation manuelle des tables (hors Docker)**
   Dans `backend/microservices` :
   ```bash
   sh init_all_tables.sh
   ```

## Frontend (à venir)
- Le dossier `frontend/` accueillera une application web moderne (React, Angular ou Vue).
- Elle consommera l’API Gateway pour toutes les opérations (authentification, gestion des livres, emprunts, etc.).
- Le build et le déploiement du frontend seront intégrés au pipeline DevOps.

## Documentation détaillée par composant
- [API Gateway](backend/api/README.md)
- [Microservice Users](backend/microservices/users/README.md)
- [Microservice Books](backend/microservices/books/README.md)
- [Microservice Emprunts](backend/microservices/emprunts/README.md)
- [Frontend (à venir)](frontend/README.md)

## Conseils & Dépannage
- Si le port 5433 est déjà utilisé, modifiez-le dans `docker-compose.yml` et tous les `.env`.
- Vérifiez que tous les services sont bien lancés avant d’utiliser l’API Gateway.
- Pour la CI/CD, ajoutez un Jenkinsfile ou un workflow GitHub Actions à la racine du projet.

---

**Auteur :** Projet DevOps DIT – 2026
