# Microservice Books – Bibliothèque Numérique DIT

## Rôle
Gère les livres de la bibliothèque (ajout, modification, suppression, recherche, consultation).

## Endpoints principaux
- `POST /books` : Ajouter un livre
- `GET /books` : Lister les livres
- `GET /books/search` : Recherche par titre, auteur, ISBN
- `GET /books/:id` : Consulter un livre
- `PUT /books/:id` : Modifier un livre
- `DELETE /books/:id` : Supprimer un livre

## Lancement
Dans ce dossier :
```bash
npm install
npm start
```

Ou via Docker Compose (recommandé).

## Configuration
- Variables d’environnement dans `.env`
- Table SQL : `books`

## Documentation API
- Swagger : http://localhost:3002/docs

---
**Auteur :** Projet DevOps DIT – 2026
