# Security & Compliance

## Network Security

### Kubernetes NetworkPolicies

Traffic between microservices is locked down using Kubernetes NetworkPolicies:

- Only the NGINX Ingress Controller (running in the `ingress-nginx` namespace) can send traffic to `auth`, `discounts`, `items`, and `frontend` pods
- Only `auth`, `discounts`, and `items` pods can send traffic to the `mongodb` pod
- All other pod-to-pod communication is blocked by default

### Single Point of Entry

Only the Ingress is exposed publicly via a LoadBalancer on port 80. All microservices use `ClusterIP` services, making them inaccessible from outside the cluster.

## Secret Management

- All sensitive environment variables (MongoDB URI, Cloudinary credentials, JWT secret) are stored in Kubernetes Secrets via `secrets.yaml`
- The `secrets.yaml` file is listed in `.gitignore` and never committed to GitHub
- CI/CD secrets (ACR credentials, Azure credentials) are stored in GitHub Actions Secrets

## Authentication & Authorization

- The `auth` microservice handles user authentication and issues JWT tokens signed with a secret key
- The `discounts` and `items` microservices validate JWT tokens on protected routes via middleware
- Tokens expire after 6 hours

## IAM Roles

- The AKS cluster uses a SystemAssigned managed identity
- A role assignment grants the AKS kubelet identity `AcrPull` permissions on the Azure Container Registry
- GitHub Actions uses a service principal with `Contributor` role scoped to the resource group

## TLS/HTTPS

- Currently running on HTTP. For production, TLS should be configured on the Ingress using cert-manager and Let's Encrypt.

## Data Encryption

- MongoDB data is stored in a Kubernetes PersistentVolume on Azure managed disks, which are encrypted at rest by default by Azure.

## Compliance

- User passwords are hashed using bcrypt before storing in MongoDB
- Sensitive user data (email, address, phone number) is stored in MongoDB with Azure's default encryption at rest
- No payment data is stored in the application
