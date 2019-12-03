# Overview

This project includes an example website with accompanying backend and storage
tiers along with the code necessary to deploy the entire stack on a Kubernetes
distribution of choice.

It uses only high level Kubernetes abstractions such that it should be
deployable to any cloud or self-installed Kubernetes provider.

# Structure

The _website_ directory contains the code that defines the website itself. It
calls the backend service in order to have CRD events handled by the backend
tier of the solution. This ultimately is bundled up into a Docker image and
published up to the Docker Hub.

The _backend_ directory contains the code that defines the API utilized by the
website. It exposes a very basic HTTP/JSON/Plain Text API that is consumed by
the website. This ultimately is bundled up into a Docker image and published up
to the Docker Hub.

The _deploy_ directory contains the Kubernetes deployment configuration that
can be used to deploy the whole solution to your Kubernetes provider of choice.
The _kube-system_ directory below it contains an ingress controller deployment
along with the RBAC objects necessary to give it access to the Kubernetes API.
If your cloud provider includes a native ingress controller, it can be ignored.
The _demo-webapp_ directory below _deploy_ contains the namespaced definitions
necessary to bring up the entire software stack, including the website, backend
and storage tiers. You should first apply the _namespace.yaml_ file before
applying the rest of the YAML file in that directory, as they depend on it
existing.

# Deployment Steps

You can run the following commands to deploy the solution into a Kubernetes
cluster:

```bash
$ kubectl apply -f ./deploy/kube-system -R
$ kubectl apply -f ./deploy/demo-webapp/namespace.yaml
$ kubectl apply -f ./deploy/demo-webapp -R
```
