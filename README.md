![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Helm](https://img.shields.io/badge/Helm-0F1689?style=for-the-badge&logo=helm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)
![Loki](https://img.shields.io/badge/Loki-F5A623?style=for-the-badge&logo=grafana&logoColor=white)
![SonarQube](https://img.shields.io/badge/SonarQube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white)
![Checkov](https://img.shields.io/badge/Checkov-4B9CD3?style=for-the-badge&logo=checkmarx&logoColor=white)
![NGINX](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Let's Encrypt](https://img.shields.io/badge/Let's_Encrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

# Restauranty

A restaurant management platform built with a **microservices architecture**: 3 Node.js/Express backends + a React frontend, unified behind HAProxy path-based routing.

## Architecture

```
                         ┌────────────────────────┐
                         │   HAProxy / Ingress    │
    Browser ───────────► │       (port 80)        │
                         └───────────┬────────────┘
                                     │
            ┌────────────────────────┼─────────────────────────┐
            │                        │                         │
       /api/auth/*             /api/items/*             /api/discounts/*
            │                        │                         │
   ┌────────▼────────┐     ┌─────────▼─────────┐    ┌─────────▼──────────┐
   │  Auth Service   │     │  Items Service    │    │ Discounts Service  │
   │   (port 3001)   │     │   (port 3003)     │    │   (port 3002)      │
   └────────┬────────┘     └─────────┬─────────┘    └──────────┬─────────┘
            │                        │                         │
            └────────────────────────┼─────────────────────────┘
                                     │
                              ┌──────▼──────┐
                              │   MongoDB   │
                              │ (port 27017)│
                              └─────────────┘
```

## Microservices

| Service | Port | Path | Responsibilities |
|---------|------|------|-----------------|
| **Auth** | 3001 | `/api/auth/*` | User signup, login, JWT authentication |
| **Discounts** | 3002 | `/api/discounts/*` | Coupon and campaign management |
| **Items** | 3003 | `/api/items/*` | Menu items, dietary categories, orders |
| **Frontend** | 3000 | `/` | React SPA (admin dashboard) |

## Quick Start

### 1. Start MongoDB

```bash
docker run -d \
  --name my-mongo \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo:latest
```

### 2. Start each microservice

```bash
# Terminal 1 - Auth
cd backend/auth && npm install && npm start

# Terminal 2 - Discounts
cd backend/discounts && npm install && npm start

# Terminal 3 - Items
cd backend/items && npm install && npm start

# Terminal 4 - Frontend
cd client && npm install && npm start
```

### 3. Start HAProxy

```bash
haproxy -f haproxy.cfg
```

Access the app at **http://localhost/**

## Environment Variables

Each microservice uses the same set of environment variables (see `.env.example` in each service folder):

| Variable | Description | Example |
|----------|-------------|---------|
| `SECRET` | JWT signing key | `MySecret1!` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/restauranty` |
| `CLOUD_NAME` | Cloudinary cloud name | _(ask instructor)_ |
| `CLOUD_API_KEY` | Cloudinary API key | _(ask instructor)_ |
| `CLOUD_API_SECRET` | Cloudinary API secret | _(ask instructor)_ |
| `PORT` | Service port | `3001` / `3002` / `3003` |

For the frontend, use the `REACT_APP_` prefix: `REACT_APP_API_URL=http://localhost:80`

## Tech Stack

- **Frontend**: React 18, React Router 6, Tailwind CSS, Axios, React Icons
- **Backend**: Express, Mongoose, JWT (jsonwebtoken + express-jwt), bcryptjs
- **Image Storage**: Cloudinary (via multer-storage-cloudinary)
- **Monitoring**: Prometheus metrics (`/metrics` endpoint on each backend service)
- **Logging**: Loki + Promtail (log aggregation and querying)
- **Routing**: HAProxy (local) / Kubernetes Ingress (production)
- **Database**: MongoDB

---

# 🍽️ Restauranty — End-to-End DevOps Project

A production-grade microservices application deployed on Azure Kubernetes Service (AKS), built as a final DevOps project. The stack includes three Node.js microservices, a React frontend, MongoDB, and a full CI/CD pipeline with monitoring, logging, security, and HTTPS.

**Live:** [https://restauranty-ij.az.ironlabs.online](https://restauranty-ij.az.ironlabs.online)

---

## 📁 Project Structure

```
devops.restauranty/
├── backend/
│   ├── auth/           # Authentication & user management (port 3001)
│   ├── discounts/      # Campaigns & coupons (port 3002)
│   └── items/          # Items, dietary info & orders (port 3003)
├── client/             # React frontend (port 3000)
├── k8s/
│   └── helm/           # Helm chart for Kubernetes deployment
│       ├── templates/  # K8s manifests (deployments, services, ingress, etc.)
│       ├── Chart.yaml
│       └── values.yaml
├── terraform/          # Infrastructure as Code (AKS + ACR)
├── Setup/              # One-time setup scripts (cert-manager, external-dns, etc.)
├── .github/
│   └── workflows/
│       └── ci-cd.yaml  # GitHub Actions pipeline
├── haproxy.cfg         # Local development routing
├── README.md
└── SECURITY.md
```

---

## 🏗️ Infrastructure

Infrastructure is provisioned using **Terraform** on **Azure**:

- **Resource Group**: `IreneandJoao`
- **AKS Cluster**: 3-node cluster (`Standard_D2s_v4`)
- **Azure Container Registry (ACR)**: `ireneandjoaoacr.azurecr.io`
- **Role Assignment**: AKS kubelet identity granted `AcrPull` on ACR

To provision:
```bash
cd terraform
terraform init
terraform apply
```

After apply, connect kubectl to the cluster:
```bash
az aks get-credentials --resource-group IreneandJoao --name IreneandJoao
```

---

## 🖥️ Running Locally

### Prerequisites
- Docker
- Node.js
- HAProxy

### 1. Start MongoDB
```bash
docker run -d \
  --name my-mongo \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo:latest
```

### 2. Create `.env` files

Each microservice needs a `.env` file. These are gitignored — never commit them.

**`backend/auth/.env`**
```
SECRET=<your_jwt_secret>
MONGODB_URI="mongodb://localhost:27017/restauranty"
CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUD_API_KEY=<your_cloudinary_api_key>
CLOUD_API_SECRET=<your_cloudinary_api_secret>
PORT=3001
```

Repeat for `backend/discounts/.env` (PORT=3002) and `backend/items/.env` (PORT=3003).

**`client/.env`**
```
REACT_APP_SERVER_URL="http://localhost:80"
```

### 3. Start each service in a separate terminal
```bash
# Terminal 1
cd backend/auth && npm install && npm start

# Terminal 2
cd backend/discounts && npm install && npm start

# Terminal 3
cd backend/items && npm install && npm start

# Terminal 4
cd client && npm install && npm start

# Terminal 5
haproxy -f haproxy.cfg
```

Access the app at `http://localhost/`. HAProxy routes all requests to the correct service based on the URL path.

---

## 🐳 Containerization

Each service has its own `Dockerfile`:

| Service | Path | Base Image |
|---------|------|------------|
| Auth | `backend/auth/Dockerfile` | node:18-alpine |
| Discounts | `backend/discounts/Dockerfile` | node:18-alpine |
| Items | `backend/items/Dockerfile` | node:18-alpine |
| Frontend | `client/Dockerfile` | node:18-alpine + nginx:alpine (multi-stage) |

---

## ☸️ Kubernetes — Helm Chart

All Kubernetes resources are managed via a **Helm chart** at `k8s/helm/`.

### Templates included
- `auth-deployment.yaml` + `auth-service.yaml`
- `discounts-deployment.yaml` + `discounts-service.yaml`
- `items-deployment.yaml` + `items-service.yaml`
- `frontend-deployment.yaml` + `frontend-service.yaml`
- `ingress.yaml` — NGINX Ingress with TLS
- `network-policies.yaml` — restricts pod-to-pod traffic
- `secrets.yaml` — Kubernetes Secrets (gitignored)
- `sonarqube-db.yaml` — PostgreSQL for SonarQube

### Helm dependencies (installed automatically)
| Dependency | Purpose |
|---|---|
| `prometheus` | Metrics collection |
| `grafana` | Metrics + log visualisation |
| `loki-stack` | Log aggregation (Loki + Promtail) |
| `sonarqube` | Code quality scanning |

### Routing (equivalent to HAProxy locally)
| Path | Service |
|------|---------| 
| `/api/auth` | auth:3001 |
| `/api/discounts` | discounts:3002 |
| `/api/items` | items:3003 |
| `/` | frontend:80 |

### Deploy manually
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo add sonarqube https://SonarSource.github.io/helm-chart-sonarqube
helm repo update
helm dependency update k8s/helm
helm upgrade --install restauranty k8s/helm
```

---

## ⚙️ CI/CD Pipeline

GitHub Actions workflow at `.github/workflows/ci-cd.yaml`:

**On every push/PR:**
- Runs **Checkov** security scan on Terraform and Kubernetes manifests
- Builds Docker images for all 4 services
- Pushes to Azure Container Registry
- Runs **SonarQube** code quality scan

**On merge to `main`:**
- Authenticates with Azure
- Sets AKS context
- Runs `helm dependency update`
- Deploys with `helm upgrade --install restauranty k8s/helm`
- Restarts all deployments to pick up new images

### Required GitHub Secrets
| Secret | Description |
|--------|-------------|
| `AZURE_CLIENT_ID` | Service principal client ID |
| `AZURE_CLIENT_SECRET` | Service principal client secret |
| `AZURE_SUBSCRIPTION_ID` | Azure subscription ID |
| `AZURE_TENANT_ID` | Azure tenant ID |
| `ACR_USERNAME` | ACR username |
| `ACR_PASSWORD` | ACR password |
| `SONAR_TOKEN` | SonarQube authentication token |
| `SONAR_HOST_URL` | SonarQube server URL |

To get ACR credentials:
```bash
az acr credential show --name ireneandjoaoacr
```

---

## 🔒 HTTPS & DNS

HTTPS is configured using **cert-manager** + **Let's Encrypt** + **external-dns** on Azure DNS.

**external-dns** automatically creates and updates DNS records in Azure DNS whenever the Ingress changes — no manual DNS management needed.

### One-time setup (run once when provisioning the cluster, in order)
```bash
bash Setup/install-sp-dns.sh
bash Setup/install-nginx-controller.sh
bash Setup/install-cert-manager.sh
bash Setup/install-clusterissuers.sh
bash Setup/install-external-dns-azure.sh
```

The app is accessible at: `https://restauranty-ij.az.ironlabs.online`

To check certificate status:
```bash
kubectl get certificate
kubectl describe certificate restauranty-tls
```

---

## 📊 Monitoring & Logging

All monitoring and logging tools are installed as **Helm dependencies** inside the cluster.

### Prometheus

Scrapes metrics from all backend microservices every 15 seconds via `/metrics` endpoints.

```bash
kubectl port-forward svc/restauranty-prometheus-server 9090:80
```
Open `http://localhost:9090`

Useful queries:
```promql
up{job=~"restauranty.*"}
rate(http_request_duration_seconds_count{job="restauranty-auth"}[5m])
container_memory_usage_bytes{namespace="default", container=~"auth|discounts|items"}
```

### Grafana

Deployed with Prometheus and Loki pre-configured as datasources. Exposed via LoadBalancer.

```bash
kubectl get svc restauranty-grafana  # get EXTERNAL-IP
```

Open `http://<EXTERNAL-IP>` — credentials: `admin` / `restauranty123`

Recommended dashboards to import:
| Dashboard | ID |
|---|---|
| Kubernetes Cluster Overview | `3119` |
| Kubernetes Pod Metrics | `6417` |
| Node Exporter | `1860` |

### Loki

Collects and stores logs from all pods via **Promtail**, which runs as a DaemonSet on every node.

Query logs in **Grafana → Explore → Loki**:
```logql
# Logs from a specific service
{app="auth"}
{app="discounts"}
{app="items"}

# Filter for errors
{namespace="default"} |= "error"
```

Check Promtail is shipping logs:
```bash
kubectl get pods | grep promtail
kubectl logs -l app.kubernetes.io/name=promtail --tail=20
```

### SonarQube

Runs inside the cluster and analyses code quality on every CI/CD push.

```bash
kubectl get svc restauranty-sonarqube  # get EXTERNAL-IP
```

Open `http://<EXTERNAL-IP>:9000` — default credentials: `admin` / `admin`

### Checkov

Runs in the CI/CD pipeline (not in the cluster) and scans Terraform and Kubernetes manifests for security misconfigurations on every push.

---

## 🔐 Security

See [SECURITY.md](./SECURITY.md) for full details. Summary:

- **NetworkPolicies** — only the NGINX Ingress and Prometheus can reach microservices; only microservices can reach MongoDB
- **Kubernetes Secrets** — all credentials stored as K8s secrets, never in code
- **`.gitignore`** — `secrets.yaml` and `.env` files are excluded from version control
- **JWT tokens** — issued by `auth`, validated by `discounts` and `items` via middleware
- **TLS** — cert-manager + Let's Encrypt, auto-renewed every 60 days
- **ACR** — AKS uses a managed identity with `AcrPull` role only
- **Checkov** — IaC security scanning on every push
- **SonarQube** — code quality gate on every push (Quality Gate: Passed)

---

## 🧹 Useful Commands

```bash
# View all pods
kubectl get pods

# View all services
kubectl get svc

# View ingress
kubectl get ingress

# Check certificate status
kubectl get certificate

# View logs for a service
kubectl logs -l app=auth --tail=50

# Manually restart a deployment
kubectl rollout restart deployment/auth

# Access Prometheus
kubectl port-forward svc/restauranty-prometheus-server 9090:80

# Access Grafana (or use EXTERNAL-IP directly)
kubectl get svc restauranty-grafana

# Access SonarQube
kubectl get svc restauranty-sonarqube

# Check Loki logs
kubectl logs -l app.kubernetes.io/name=promtail --tail=20
```

---

## 👥 Authors

- **Irene Romero Martínez** — [@ireneromero95](https://github.com/ireneromero95)
- **João Ribeiro** — [@joaodmorgadoribeiro-del](https://github.com/joaodmorgadoribeiro-del)

---

*Built as a final project for the **Ironhack Cloud & DevOps Bootcamp** 🚀*