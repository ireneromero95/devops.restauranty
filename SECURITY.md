# Security & Compliance

## Network Security

### Kubernetes NetworkPolicies

Traffic between microservices is locked down using Kubernetes NetworkPolicies:

- Only the NGINX Ingress Controller (running in the `ingress-nginx` namespace) can send traffic to `auth`, `discounts`, `items`, and `frontend` pods
- Only `auth`, `discounts`, and `items` pods can send traffic to the `mongodb` pod
- Prometheus can reach all backend microservices to scrape `/metrics` endpoints
- All other pod-to-pod communication is blocked by default

### Single Point of Entry

Only the Ingress is exposed publicly via a LoadBalancer on port 80/443. All microservices use `ClusterIP` services, making them inaccessible from outside the cluster.

---

## Secret Management

- All sensitive environment variables (MongoDB URI, Cloudinary credentials, JWT secret) are stored in Kubernetes Secrets via `secrets.yaml`
- The `secrets.yaml` file is listed in `.gitignore` and never committed to GitHub
- CI/CD secrets (ACR credentials, Azure credentials, SonarQube token) are stored in GitHub Actions Secrets
- Azure DNS Service Principal credentials are stored as Kubernetes Secrets (`azuredns-config`) for cert-manager and external-dns

---

## Authentication & Authorization

- The `auth` microservice handles user authentication and issues JWT tokens signed with a secret key
- The `discounts` and `items` microservices validate JWT tokens on protected routes via middleware
- Tokens expire after 6 hours

---

## IAM & Access Control

- The AKS cluster uses a `SystemAssigned` managed identity
- A role assignment grants the AKS kubelet identity `AcrPull` permissions on the Azure Container Registry — pull only, no push
- GitHub Actions uses a service principal with `Contributor` role scoped to the resource group only
- The Azure DNS Service Principal has `DNS Zone Contributor` role scoped to the specific DNS zone only — no broader permissions

---

## TLS/HTTPS

HTTPS is configured and active in production:

- **cert-manager** manages TLS certificate lifecycle automatically
- **Let's Encrypt** issues browser-trusted certificates via DNS01 challenge on Azure DNS
- Certificates are valid for 90 days and renewed automatically at 60 days — no manual action needed
- The Ingress enforces HTTPS and redirects all HTTP traffic to HTTPS

The app is accessible at: `https://restauranty-ij.az.ironlabs.online`

To check certificate status:
```bash
kubectl get certificate
kubectl describe certificate restauranty-tls
```

---

## Code Quality & IaC Security

### SonarQube

SonarQube runs inside the cluster and scans all backend and frontend code on every CI/CD push:

- **Quality Gate: Passed** — 0 security issues, A rating on reliability and maintainability
- 18 Security Hotspots flagged for review (JWT handling, credential exposure patterns)
- 0.0% test coverage — identified as a next step

### Checkov

Checkov runs in the CI/CD pipeline and scans Terraform and Kubernetes manifests for security misconfigurations on every push:

- Scans `terraform/` for cloud infrastructure misconfigurations
- Scans `k8s/helm/templates/` for Kubernetes security issues
- Known findings: containers running without explicit `securityContext`, `latest` image tags, missing resource limits — tracked as next steps

---

## Data Encryption

- MongoDB data is stored in a Kubernetes PersistentVolume on Azure managed disks, which are encrypted at rest by default by Azure
- TLS encrypts all data in transit between the browser and the cluster

---

## Compliance

- User passwords are hashed using **bcrypt** before storing in MongoDB
- Sensitive user data (email, address, phone number) is stored in MongoDB with Azure's default encryption at rest
- No payment data is stored in the application
- `.env` files and `secrets.yaml` are excluded from version control via `.gitignore`