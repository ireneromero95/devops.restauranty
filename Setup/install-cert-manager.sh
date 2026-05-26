#!/usr/bin/env bash
set -euo pipefail

CLUSTER_NAME="IreneandJoao"
RESOURCE_GROUP="IreneandJoao"
SUBSCRIPTION_ID="daf9c53c-7096-4293-9bb1-f7ad8263db1a"
TENANT_ID="84f58ce9-43c8-4932-b908-591a8a3007d3"

helm repo add jetstack https://charts.jetstack.io
helm repo update jetstack

helm upgrade --install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --version v1.17.2 \
  --set crds.enabled=true \
  --wait --timeout=5m

echo ""
echo "==> cert-manager installed for ${CLUSTER_NAME}."
kubectl get pods -n cert-manager