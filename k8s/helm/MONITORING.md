# 📊 Monitoring & Logs

## Viewing Logs

### All pods
```bash
kubectl get pods
```

### Logs of a specific microservice
```bash
# Auth
kubectl logs -l app=auth --tail=50

# Discounts
kubectl logs -l app=discounts --tail=50

# Items
kubectl logs -l app=items --tail=50

# Frontend
kubectl logs -l app=frontend --tail=50
```

### Follow logs in real time
```bash
kubectl logs -l app=auth -f
```

### Logs of a specific pod
```bash
# Get pod name
kubectl get pods

# View logs
kubectl logs <pod-name> --tail=100
```

---

## Viewing Metrics

### Prometheus

Prometheus collects metrics from all backend microservices every 15 seconds.

**Access Prometheus:**
```bash
kubectl port-forward svc/restauranty-prometheus-server 9090:80
```
Open in browser: `http://localhost:9090`

**Useful queries in Prometheus:**
```promql
# Check which services are up
up

# CPU usage per pod
rate(container_cpu_usage_seconds_total[5m])

# Memory usage per pod
container_memory_usage_bytes
```

---

### Grafana

Grafana is deployed inside the AKS cluster via Helm and reads metrics from both Prometheus and Loki.

**Access Grafana:**

Grafana is exposed via LoadBalancer — no port-forward needed:
```
http://<EXTERNAL-IP>
```

Get the external IP:
```bash
kubectl get svc restauranty-grafana
```

Default credentials:
- **Username:** `admin`
- **Password:** `restauranty123`

Or retrieve from the secret:
```bash
kubectl get secret restauranty-grafana -o jsonpath="{.data.admin-password}" | base64 --decode
```

**Data Sources configured automatically:**
| Data Source | URL | Purpose |
|---|---|---|
| Prometheus | `http://restauranty-prometheus-server:80` | Metrics |
| Loki | `http://restauranty-loki:3100` | Logs |

**Recommended Dashboards to import:**
| Dashboard | ID |
|---|---|
| Kubernetes Cluster Overview | `3119` |
| Kubernetes Pod Metrics | `6417` |
| Node Exporter | `1860` |

To import: **Dashboards → Import → Enter ID → Load → Select Prometheus → Import**

---

### Loki

Loki collects and stores logs from all pods via Promtail, which runs as a DaemonSet on every node.

**Access logs via Grafana Explore:**
```
Grafana → Explore → Select Loki datasource
```

**Useful LogQL queries:**
```logql
# All logs from the auth service
{app="auth"}

# All logs from the default namespace
{namespace="default"}

# Filter for errors in items service
{app="items"} |= "error"

# Filter for errors across all services
{namespace="default"} |= "error"
```

**Check Promtail is running:**
```bash
kubectl get pods | grep promtail
kubectl logs -l app.kubernetes.io/name=promtail --tail=20
```

---

## Cluster Health Check

Quick check of the full cluster status:
```bash
# All resources
kubectl get all

# Pod status
kubectl get pods

# Services and IPs
kubectl get svc

# Ingress
kubectl get ingress

# Check certificate status
kubectl get certificate
```

