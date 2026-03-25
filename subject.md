# Master 1 Intelligence artificielle
## Examen Pratique DevOps
Projet DevOps : Bibliothèque Numérique Microservices
Durée : 3 semaines - du 09 Mars 2026 au 29 Mars 2026
## Contexte général
Le Dakar Institute of Technology (DIT) souhaite moderniser la gestion de sa
bibliothèque académique.
Actuellement, la gestion des livres et des emprunts est réalisée de manière ma-
nuelle, ce qui entraîne plusieurs problèmes :
- Difficulté de suivi des livres
- Absence de statistiques fiables
- Gestion inefficace des emprunts
- Manque d’accès numérique pour les étudiants

Afin de résoudre ces problèmes, la direction du DIT souhaite développer une plate-
forme web moderne basée sur une architecture microservices permettant
de gérer l’ensemble des opérations de la bibliothèque.
Vous êtes recruté en tant qu’équipe DevOps pour concevoir, développer et auto-
matiser le déploiement de cette application.
## Objectifs pédagogiques
Ce projet vise à évaluer votre capacité à :
- Concevoir une architecture microservices
- Développer une application backend API
- Concevoir une interface frontend
- Utiliser Docker et Docker Compose
- Mettre en place un pipeline CI/CD avec Jenkins
- Gérer un projet avec Git et GitHub
- Automatiser le déploiement d’une application

## Examen DevOps DIT
Architecture du projet
L’application doit respecter l’architecture suivante :
- Architecture microservices
- Communication via API REST
- Base de données relationnelle
- Conteneurisation avec Docker
- Orchestration avec Docker Compose
- Pipeline CI/CD avec Jenkins
## Technologies autorisées
Les étudiants sont libres de choisir les technologies suivantes :
### Backend
- Spring Boot
- Node.js (Express)
- Django / Django REST
- Flask
- FastAPI
### Frontend
- React
- Angular
- Vue.js
- HTML / CSS / JavaScript
### Base de données
- MySQL
- PostgreSQL
## Microservices à implémenter
L’application devra contenir au minimum les fonctionnalités suivantes :

1- Livres

Fonctionnalités :
- Ajouter un livre
- Modifier un livre
- Supprimer un livre
- Lister les livres
- Recherche par titre, auteur ou ISBN

2 - Utilisateurs

- Création d’utilisateurs
- Liste des utilisateurs
- Gestion des types d’utilisateurs(Etudiant, Professeur et Personnel administratif)
- Consultation du profil utilisateur

3 - Emprunts

- Emprunter un livre
- Retourner un livre
- Historique des emprunts
- Détection des retards
## Conteneurisation

Chaque composant de l’application devra être conteneurisé :
- Backend
- Frontend
- Base de données
Chaque miroservice backend ou frontend doit posséder son propre :
- Dockerfile
Le projet devra être déployé avec :
- Docker Compose
# Pipeline CI/CD
Vous devez mettre en place un pipeline CI/CD avec Jenkins permettant :
- Récupération du code depuis GitHub
- Construction de l’application
- Build des images Docker
- Déploiement automatique avec Docker Compose
Le pipeline devra être défini dans un fichier :
- Jenkinsfile
# Livrables attendus
Les éléments suivants sont obligatoires :

1 - Code source

code envoyé sur :
GitHub
Le dépôt(repository) doit contenir :
- Code backend
- Code frontend
- Dockerfile backend et Dockerfile frontend
- docker-compose.yml
- Jenkinsfile

2 - Rapport du projet

Document PDF contenant :
- Présentation du projet
- Architecture du système
- Description des microservices
- Explication du pipeline CI/CD
- Captures d’écran de l’application
3 - README

Le README doit expliquer :
- Installation du projet
- Lancement avec Docker Compose
- Fonctionnement du pipeline Jenkins
- Structure du projet