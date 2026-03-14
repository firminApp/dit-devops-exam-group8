# Microservice Users – Bibliothèque Numérique DIT

## Rôle
Gère les utilisateurs de la bibliothèque (création, consultation, modification, suppression, gestion des rôles).

## Endpoints principaux
- `POST /users` : Créer un utilisateur
- `GET /users` : Lister les utilisateurs
- `GET /users/:id` : Consulter un profil
- `PUT /users/:id` : Modifier un utilisateur
- `DELETE /users/:id` : Supprimer un utilisateur

## Types d’utilisateurs
- Étudiant
- Professeur
- Personnel administratif

## Lancement
Dans ce dossier :
```bash
npm install
npm start
```

Ou via Docker Compose (recommandé).

## Configuration
- Variables d’environnement dans `.env`
- Table SQL : `users`

## Documentation API
- Swagger : http://localhost:3001/docs

---
**Auteur :** Projet DevOps DIT – 2026
