#!/usr/bin/env bash
set -euo pipefail

CLUSTER_NAME="IreneandJoao"
RESOURCE_GROUP="IreneandJoao"

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update ingress-nginx

helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.service.type=LoadBalancer \
  --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"="/healthz" \
  --wait --timeout=5m

echo ""
echo "==> nginx ingress controller installed for ${CLUSTER_NAME}."
kubectl get pods -n ingress-nginx
kubectl get service -n ingress-nginx