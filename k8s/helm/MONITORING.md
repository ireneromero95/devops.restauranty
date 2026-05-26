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
 
Prometheus collects metrics from all microservices every 15 seconds.
 
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
 
Grafana is deployed inside the AKS cluster via Helm and reads metrics directly from Prometheus.
 
**Access Grafana:**
```bash
kubectl port-forward svc/restauranty-grafana 3000:80
```
Open in browser: `http://localhost:3000`
 
Default credentials:
- **Username:** `admin`
- **Password:** retrieve with:
```bash
kubectl get secret restauranty-grafana -o jsonpath="{.data.admin-password}" | base64 --decode
```
 
**Add Prometheus as Data Source:**
1. Go to **Connections → Data sources → Add new**
2. Select **Prometheus**
3. Set URL to: `http://restauranty-prometheus-server:80`
4. Click **Save & Test**
**Recommended Dashboards to import:**
| Dashboard | ID |
|---|---|
| Kubernetes Cluster Overview | `3119` |
| Kubernetes Pod Metrics | `6417` |
| Node Exporter | `1860` |
 
To import: **Dashboards → Import → Enter ID → Load → Select Prometheus → Import**
 
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
```
