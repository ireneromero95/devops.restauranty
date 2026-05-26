#!/usr/bin/env bash
set -euo pipefail

SUBSCRIPTION_ID="903386a5-cfc1-4cac-8302-11a1e1410051"
RESOURCE_GROUP="DefaultResourceGroup-DEWC"
DNS_ZONE="az.ironlabs.online"
SP_NAME="restauranty-dns-$(date +%s)"

# ── Create new Service Principal ───────────────────────────────────────────────
echo "==> Creating new Service Principal for Azure DNS..."
SP_OUTPUT=$(az ad sp create-for-rbac \
  --name "${SP_NAME}" \
  --role "DNS Zone Contributor" \
  --scopes /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/Microsoft.Network/dnszones/${DNS_ZONE} \
  --output json)

CLIENT_SECRET=$(echo $SP_OUTPUT | python3 -c "import sys, json; print(json.load(sys.stdin)['password'])")
CLIENT_ID=$(echo $SP_OUTPUT | python3 -c "import sys, json; print(json.load(sys.stdin)['appId'])")

echo ""
echo "==> Service Principal created."
echo "    Name:     ${SP_NAME}"
echo "    ClientID: ${CLIENT_ID}"

# ── Save CLIENT_ID for other scripts ──────────────────────────────────────────
echo "export DNS_CLIENT_ID=${CLIENT_ID}" > /tmp/dns-sp-env.sh
echo "export DNS_CLIENT_SECRET=${CLIENT_SECRET}" >> /tmp/dns-sp-env.sh

# ── Create Kubernetes Secrets ──────────────────────────────────────────────────
echo ""
echo "==> Creating azuredns-config secret..."
kubectl create secret generic azuredns-config \
  --namespace cert-manager \
  --from-literal=client-secret="${CLIENT_SECRET}" \
  --from-literal=client-id="${CLIENT_ID}" \
  --dry-run=client -o yaml | kubectl apply -f -

echo ""
echo "==> Creating azure-config-file secret in external-dns namespace..."
kubectl create namespace external-dns --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic azure-config-file \
  --namespace external-dns \
  --from-literal=azure.json="{
    \"tenantId\": \"84f58ce9-43c8-4932-b908-591a8a3007d3\",
    \"subscriptionId\": \"${SUBSCRIPTION_ID}\",
    \"resourceGroup\": \"${RESOURCE_GROUP}\",
    \"aadClientId\": \"${CLIENT_ID}\",
    \"aadClientSecret\": \"${CLIENT_SECRET}\"
  }" \
  --dry-run=client -o yaml | kubectl apply -f -

echo ""
echo "==> Done! Secrets created."
kubectl get secret azuredns-config
kubectl get secret azure-config-file -n external-dns