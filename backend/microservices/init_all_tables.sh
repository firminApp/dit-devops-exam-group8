#!/bin/bash
# Script d'initialisation des tables dans le bon ordre

set -e

cd "$(dirname "$0")"


cd ./users && npm run initdb
cd ../books && npm run initdb
cd ../emprunts && npm run initdb

echo "Toutes les tables ont été initialisées avec succès dans usersdb."
