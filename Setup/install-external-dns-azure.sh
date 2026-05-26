#!/usr/bin/env bash
set -euo pipefail

CLUSTER_NAME="IreneandJoao"
SUBSCRIPTION_ID="903386a5-cfc1-4cac-8302-11a1e1410051"
TENANT_ID="84f58ce9-43c8-4932-b908-591a8a3007d3"
CLIENT_ID="1618f74d-7a75-4ced-898e-c23a809dae0d"
DNS_RESOURCE_GROUP="DefaultResourceGroup-DEWC"
DNS_ZONE="az.ironlabs.online"

# ── Create namespace first ─────────────────────────────────────────────────────
kubectl create namespace external-dns --dry-run=client -o yaml | kubectl apply -f -

# ── Create Azure DNS credentials secret in correct namespace ───────────────────
echo "==> Creating Azure DNS credentials secret..."
CLIENT_SECRET=$(kubectl get secret azuredns-config -n external-dns -o jsonpath='{.data.client-secret}' | base64 --decode)

kubectl create secret generic azure-config-file \
  --namespace external-dns \
  --from-literal=azure.json="{
    \"tenantId\": \"${TENANT_ID}\",
    \"subscriptionId\": \"${SUBSCRIPTION_ID}\",
    \"resourceGroup\": \"${DNS_RESOURCE_GROUP}\",
    \"aadClientId\": \"${CLIENT_ID}\",
    \"aadClientSecret\": \"${CLIENT_SECRET}\"
  }" \
  --dry-run=client -o yaml | kubectl apply -f -

# ── Install External DNS ───────────────────────────────────────────────────────
echo "==> Installing External DNS for Azure DNS..."
helm repo add external-dns https://kubernetes-sigs.github.io/external-dns/
helm repo update external-dns

helm upgrade --install external-dns external-dns/external-dns \
  --namespace external-dns \
  --set provider.name=azure \
  --set azure.resourceGroup="${DNS_RESOURCE_GROUP}" \
  --set azure.tenantId="${TENANT_ID}" \
  --set azure.subscriptionId="${SUBSCRIPTION_ID}" \
  --set azure.aadClientId="${CLIENT_ID}" \
  --set azure.aadClientSecret="${CLIENT_SECRET}" \
  --set domainFilters[0]="${DNS_ZONE}" \
  --set policy=sync \
  --set txtOwnerId="${CLUSTER_NAME}" \
  --set extraVolumes[0].name=azure-config \
  --set extraVolumes[0].secret.secretName=azure-config-file \
  --set extraVolumeMounts[0].name=azure-config \
  --set extraVolumeMounts[0].mountPath=/etc/kubernetes \
  --set extraVolumeMounts[0].readOnly=true

echo ""
echo "==> External DNS installed for ${CLUSTER_NAME}."
kubectl get pods -n external-dns