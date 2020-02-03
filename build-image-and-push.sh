#!/bin/bash
set -e

IMAGE_URL="514404433551.dkr.ecr.us-east-1.amazonaws.com/conquista/react-front"

yarn
yarn build

$(aws ecr get-login --no-include-email)
docker build -t ${IMAGE_URL} .
docker push ${IMAGE_URL}
