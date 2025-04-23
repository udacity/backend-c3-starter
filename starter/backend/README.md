## Taskify Backend in Golang

### Prerequisites
- Install Postgresql
- Setup these vars appropriately based on your environment
```
export DB_HOST=localhost
export DB_PORT=5432
export DB_USER=taskmanager
export DB_PASSWORD=${DB_PASSWORD}
export DB_NAME=taskmanager
export JWT_SECRET=${JWT_SECRET}
```
```

### Install all dependencies
```
go mod tidy
go mod download
```

### Start Task Manager
```
go run main.go
```

