# [Client Side Logo Generator](https://github.com/europanite/client_side_logo_generator "Client Side Logo Generator")

[![CI](https://github.com/europanite/client_side_logo_generator/actions/workflows/ci.yml/badge.svg)](https://github.com/europanite/client_side_logo_generator/actions/workflows/ci.yml)
[![docker](https://github.com/europanite/client_side_logo_generator/actions/workflows/docker.yml/badge.svg)](https://github.com/europanite/client_side_logo_generator/actions/workflows/docker.yml)
[![GitHub Pages](https://github.com/europanite/client_side_logo_generator/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/europanite/client_side_logo_generator/actions/workflows/deploy-pages.yml)

!["web_ui"](./assets/images/web_ui.png)

##  🚀 PlayGround
 [Client Side Logo Generator](https://europanite.github.io/client_side_logo_generator/)

A Client Side Logo Generator.

---

## 🚀 Getting Started

### 1. Prerequisites
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Build and start all services:

```bash
# set environment variables:
export REACT_NATIVE_PACKAGER_HOSTNAME=${YOUR_HOST}

# Build the image
docker compose build

# Run the container
docker compose up

```

### 3. Test:
```bash
docker compose \
-f docker-compose.test.yml up \
--build --exit-code-from \
frontend_test
```

---

# License
- Apache License 2.0