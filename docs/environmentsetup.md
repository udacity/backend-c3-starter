# Project Environment

This project is built with **Golang** and uses **PostgreSQL** as its database. Please ensure you have the following prerequisites installed before getting started:

## Prerequisites

- [Go](https://go.dev/doc/install)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Postman](https://www.postman.com/downloads/) or any other API testing tool of your choice
- *(Optional)* [Docker](https://docs.docker.com/engine/install/)
- *(Optional)* [Docker Compose](https://docs.docker.com/compose/install/)

## Local Development Setup

If you prefer to work locally, make sure you have:

- A code editor, such as [Visual Studio Code](https://code.visualstudio.com/)  
  - *(Recommended)* [Go extension for VS Code](https://code.visualstudio.com/docs/languages/go)
- [Go](https://go.dev/doc/install) installed on your machine

### Setting Up PostgreSQL with Docker

To quickly start a PostgreSQL instance using Docker, run:

```sh
docker run -itd --name postgres --restart=always \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=${STRONG_PASSWORD} \
  -e POSTGRES_USER=taskmanager \
  -e POSTGRES_DB=taskmanager \
  postgres:17
```

> **Note:** This uses PostgreSQL version 17. You may use any supported version (13 or newer), but avoid [end-of-life versions](https://endoflife.date/postgresql).

### Connecting to PostgreSQL

Connect to your PostgreSQL instance using the `psql` interactive shell:

```sh
psql -h localhost -p 5432 -U taskmanager -d taskmanager
```

- This command connects to the `taskmanager` database as the `taskmanager` user on your local machine (default port 5432).
- Once connected, you can execute SQL queries, manage tables, and insert data interactively.

## Workspace Instructions

If you are using the provided workspace environment:

- **Go** and **PostgreSQL** are already installed—no setup required.
- You can start using the workspace immediately.

### Connecting to PostgreSQL in the Workspace

To connect to PostgreSQL within the workspace, use:

```sh
psql -h localhost -p 5432 -U taskmanager -d taskmanager
```

---

**Tip:**  
Regularly test your API endpoints using Postman or your preferred tool to ensure everything works as expected.
