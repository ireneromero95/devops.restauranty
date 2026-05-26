#!/usr/bin/env bash
set -euo pipefail

SUBSCRIPTION_ID="903386a5-cfc1-4cac-8302-11a1e1410051"
# SUBSCRIPTION_ID="daf9c53c-7096-4293-9bb1-f7ad8263db1a"
TENANT_ID="84f58ce9-43c8-4932-b908-591a8a3007d3"
RESOURCE_GROUP="DefaultResourceGroup-DEWC"
DNS_ZONE="az.ironlabs.online"
ACME_EMAIL="finkry@gmail.com"

CLIENT_ID=$(kubectl get secret azuredns-config -n cert-manager -o jsonpath='{.data.client-id}' | base64 --decode)
CLIENT_SECRET=$(kubectl get secret azuredns-config -n cert-manager -o jsonpath='{.data.client-secret}' | base64 --decode)

# ── Staging issuer ─────────────────────────────────────────────────────────────
echo "==> Creating letsencrypt-staging ClusterIssuer..."
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    email: ${ACME_EMAIL}
    privateKeySecretRef:
      name: letsencrypt-staging-key
    solvers:
      - dns01:
          azureDNS:
            clientID: ${CLIENT_ID}
            clientSecretSecretRef:
              name: azuredns-config
              key: client-secret
            subscriptionID: ${SUBSCRIPTION_ID}
            tenantID: ${TENANT_ID}
            resourceGroupName: ${RESOURCE_GROUP}
            hostedZoneName: ${DNS_ZONE}
EOF

# ── Production issuer ─────────────────────────────────────────────────────────
echo "==> Creating letsencrypt-prod ClusterIssuer..."
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: ${ACME_EMAIL}
    privateKeySecretRef:
      name: letsencrypt-prod-key
    solvers:
      - dns01:
          azureDNS:
            clientID: ${CLIENT_ID}
            clientSecretSecretRef:
              name: azuredns-config
              key: client-secret
            subscriptionID: ${SUBSCRIPTION_ID}
            tenantID: ${TENANT_ID}
            resourceGroupName: ${RESOURCE_GROUP}
            hostedZoneName: ${DNS_ZONE}
EOF

echo ""
echo "==> ClusterIssuers created. Waiting for ACME registration..."
kubectl wait clusterissuer letsencrypt-staging letsencrypt-prod \
  --for=condition=Ready --timeout=60s

kubectl get clusterissuer