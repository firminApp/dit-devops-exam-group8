# Bibliotheque Numerique DIT - DevOps

## Presentation
Ce dossier contient l orchestration Docker Compose de la plateforme complete :
- base PostgreSQL
- API backend Fastify
- frontend React (servi par Nginx)
- pgAdmin

Le fichier principal est [devops/docker-compose.yml](docker-compose.yml).

## Prerequis
- Docker
- Docker Compose (plugin docker compose ou docker-compose)

## Lancement
Depuis ce dossier :

```bash
docker compose up --build
```

Alternative compatible :

```bash
docker-compose up --build
```

## Services exposes
- Frontend : http://localhost:8080
- API : http://localhost:3000
- Swagger : http://localhost:3000/docs
- Healthcheck API : http://localhost:3000/health
- PostgreSQL : localhost:5433
- pgAdmin : http://localhost:5050

## Jenkins en conteneur autonome (hors Docker Compose)
Jenkins est volontairement detache de docker-compose.

Build de l image Jenkins locale :

```bash
docker build -t bibliotheque-jenkins:local ./jenkins
```

Lancement du conteneur Jenkins :

```bash
docker run -d \
	--name jenkins-local \
	-p 8081:8080 \
	-p 50000:50000 \
	-v jenkins_home_local:/var/jenkins_home \
	-v /var/run/docker.sock:/var/run/docker.sock \
	bibliotheque-jenkins:local
```

Recuperer le mot de passe admin initial :

```bash
docker exec jenkins-local cat /var/jenkins_home/secrets/initialAdminPassword
```

Puis dans Jenkins :
- installer les plugins suggeres
- creer un job Pipeline
- configurer le job sur le depot GitHub
- choisir Pipeline script from SCM
- script path : Jenkinsfile

## Acces pgAdmin
- Email : admin@gmail.com
- Mot de passe : admin1234

Configuration serveur PostgreSQL dans pgAdmin :
- Host : db
- Port : 5432
- User : admin
- Password : admin123
- Database : librarydb

## Ordre de demarrage
Le service db dispose d un healthcheck PostgreSQL.
Les services api et pgadmin attendent que la base soit healthy avant de demarrer.

## Arret
Depuis ce dossier :

```bash
docker compose down
```

Pour supprimer aussi les volumes :

```bash
docker compose down -v
```

## Volumes
- db_data : donnees PostgreSQL
- pgadmin_data : configuration et donnees pgAdmin

---

Auteur : Projet DevOps DIT - 2026
