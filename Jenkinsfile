pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    COMPOSE_FILE = 'devops/docker-compose.yml'
    BACKEND_DIR = 'backend/api'
    FRONTEND_DIR = 'frontend'
  }

  stages {
    stage('Checkout Source Code') {
      steps {
        // Jenkins récupère le code depuis le dépôt GitHub configuré dans le job.
        checkout scm
      }
    }

    stage('Build Application') {
      steps {
        sh '''
          set -e

          cd "$BACKEND_DIR"
          npm ci

          cd "$WORKSPACE/$FRONTEND_DIR"
          npm ci
          npm run build
        '''
      }
    }

    stage('Build Docker Images') {
      steps {
        sh '''
          set -e
          docker compose -f "$COMPOSE_FILE" build
        '''
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        sh '''
          set -e
          docker compose -f "$COMPOSE_FILE" up -d --remove-orphans
          docker compose -f "$COMPOSE_FILE" ps
        '''
      }
    }
  }

  post {
    success {
      echo 'Pipeline CI/CD terminé avec succès.'
    }
    failure {
      echo 'Pipeline en échec. Vérifiez les logs des étapes Jenkins.'
    }
  }
}
