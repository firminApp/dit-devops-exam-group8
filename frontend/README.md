# Frontend - Bibliotheque Numerique DIT

Application React (Vite) pour piloter les operations principales de la bibliotheque via l API backend Fastify.

## Fonctionnalites implementees

- Tableau de bord avec statistiques principales
- Gestion des livres
- Ajout de livre
- Recherche de livres par titre, auteur, ISBN
- Suppression de livre
- Gestion des utilisateurs
- Ajout d utilisateur
- Suppression d utilisateur
- Gestion des emprunts
- Creation d emprunt
- Retour d un emprunt
- Consultation des retards
- Consultation de l historique d emprunts par utilisateur

## Prerequis

- Node.js 20+
- API backend disponible sur http://localhost:3000

## Installation et lancement

Depuis le dossier frontend:

npm install
npm run dev

Application disponible par defaut sur http://localhost:5173

## Configuration

La base URL de l API peut etre surchargee avec une variable d environnement:

VITE_API_BASE_URL=http://localhost:3000

## Build production

npm run build
npm run preview
