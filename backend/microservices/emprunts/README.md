# Microservice Emprunts – Bibliothèque Numérique DIT

## Rôle
Gère les emprunts de livres (emprunter, retourner, historique, détection des retards).

## Endpoints principaux
- `POST /emprunts` : Enregistrer un emprunt
- `GET /emprunts` : Lister tous les emprunts
- `GET /emprunts/:id` : Détail d’un emprunt
- `PUT /emprunts/:id/retour` : Retourner un livre
- `GET /emprunts/historique/:user_id` : Historique d’un utilisateur
- `GET /emprunts/retards` : Détection des retards

## Lancement
Dans ce dossier :
```bash
npm install
npm start
```

Ou via Docker Compose (recommandé).

## Configuration
- Variables d’environnement dans `.env`
- Table SQL : `emprunts` (liée à `users` et `books`)

## Documentation API
- Swagger : http://localhost:3003/docs

---
**Auteur :** Projet DevOps DIT – 2026
