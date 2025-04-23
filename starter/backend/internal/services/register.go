package services

import (
	"task-manager/backend/internal/models"

	"gorm.io/gorm"
)

type RegisterService interface {
	RegisterUser(db *gorm.DB, user models.User) error
}

type RegisterServiceImpl struct{}

func NewRegisterService() *RegisterServiceImpl {
	return &RegisterServiceImpl{}
}
