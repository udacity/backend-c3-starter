package repositories

import (
	"fmt"
	"log"
	"os"
	"task-manager/backend/internal/utils"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DatabaseConfig struct {
	Host            string
	Port            string
	User            string
	Password        string
	Name            string
	SSLMode         string
	MaxOpenConns    int
	MaxIdleConns    int
	ConnMaxLifetime time.Duration
}

func NewDatabaseConfig() *DatabaseConfig {
	return &DatabaseConfig{
		Host:            utils.GetEnv("DB_HOST", "localhost"),
		Port:            utils.GetEnv("DB_PORT", "5432"),
		User:            utils.GetEnv("DB_USER", "postgres"),
		Password:        utils.GetEnv("DB_PASSWORD", ""),
		Name:            utils.GetEnv("DB_NAME", "taskmanager"),
		SSLMode:         utils.GetEnv("DB_SSLMODE", "disable"),
		MaxOpenConns:    utils.GetEnvAsInt("DB_MAX_OPEN_CONNS", 25),
		MaxIdleConns:    utils.GetEnvAsInt("DB_MAX_IDLE_CONNS", 5),
		ConnMaxLifetime: utils.GetEnvAsDuration("DB_CONN_MAX_LIFETIME", time.Hour),
	}
}

func (cfg *DatabaseConfig) Connect() (*gorm.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		cfg.Host, cfg.User, cfg.Password, cfg.Name, cfg.Port, cfg.SSLMode,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get database instance: %w", err)
	}

	sqlDB.SetMaxOpenConns(cfg.MaxOpenConns)
	sqlDB.SetMaxIdleConns(cfg.MaxIdleConns)
	sqlDB.SetConnMaxLifetime(cfg.ConnMaxLifetime)

	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("database ping failed: %w", err)
	}

	return db, nil
}

func NewDatabaseConnection() (*gorm.DB, error) {

	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		dbHost, dbUser, dbPassword, dbName, dbPort)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	return db, nil
}
