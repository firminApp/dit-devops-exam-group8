# Initialisation et lancement du backend

## 1. Prérequis
- Docker et Docker Compose installés
- Node.js (pour développement local hors Docker)

## 2. Lancer toute l’architecture backend

Dans le dossier `backend/api` :

```bash
docker-compose up --build
```

Cela va :
- Démarrer une base PostgreSQL sur le port 5433
- Construire et lancer les microservices users (3001), books (3002), emprunts (3003)
- Lancer l’API Gateway sur le port 3000

## 3. Accès aux services
- API Gateway : http://localhost:3000
- Docs Swagger :
  - Users : http://localhost:3001/docs
  - Books : http://localhost:3002/docs
  - Emprunts : http://localhost:3003/docs
  - Liens centralisés : http://localhost:3000/docs

## 4. Arrêter tous les services

Dans le dossier `backend/api` :

```bash
docker-compose down
```

## 5. (Optionnel) Initialisation manuelle des tables (hors Docker)

Dans `backend/microservices` :
```bash
sh init_all_tables.sh
```

---

**Remarque :**
- Si le port 5433 est déjà utilisé, modifiez-le dans `docker-compose.yml` et tous les `.env`.
- Pour un développement local, adaptez les variables d’environnement dans chaque `.env`.
