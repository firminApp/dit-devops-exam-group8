#!/bin/sh
# Run Jenkins container
docker build -t bibliotheque-jenkins:local .


docker run -d \
	--name jenkins-local \
	-p 8081:8080 \
	-p 50000:50000 \
	-v jenkins_home_local:/var/jenkins_home \
	-v /var/run/docker.sock:/var/run/docker.sock \
	bibliotheque-jenkins:local