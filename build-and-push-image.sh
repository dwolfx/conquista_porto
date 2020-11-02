#!/bin/bash
set -e

REGISTRY="514404433551.dkr.ecr.us-east-1.amazonaws.com"
IMAGE_URL="${REGISTRY}/conquista/frontend"

aws --region us-east-1 ecr get-login-password | \
docker login \
  --username AWS \
  --password-stdin ${REGISTRY}

docker build -t ${IMAGE_URL} .
docker push ${IMAGE_URL}