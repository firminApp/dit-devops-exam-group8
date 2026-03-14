# Users Microservice (Node.js)

Ce microservice gère les utilisateurs de la bibliothèque numérique du DIT.

## Fonctionnalités
- Création d’utilisateurs
- Liste des utilisateurs
- Gestion des types d’utilisateurs (Etudiant, Professeur, Personnel administratif)
- Consultation du profil utilisateur

## Démarrage local

```bash
cd backend/microservices/users
npm install
npm run dev
```

Le service sera accessible sur http://localhost:3001

## Endpoints
- `POST /users` : Créer un utilisateur
- `GET /users` : Lister les utilisateurs
- `GET /users/:id` : Consulter le profil d’un utilisateur
- `PUT /users/:id` : Modifier un utilisateur (optionnel)
- `DELETE /users/:id` : Supprimer un utilisateur (optionnel)

## Exemple de payload pour création
```json
{
  "nom": "Jean Dupont",
  "email": "jean.dupont@dit.sn",
  "type": "Etudiant"
}
```
