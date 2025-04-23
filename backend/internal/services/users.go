package services

import (
	"fmt"
	"task-manager/backend/internal/models"

	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type UserService interface {
	GetUserProfile(db *gorm.DB, userID uuid.UUID) (models.User, error)
	GetUserProfileMalicious(db *gorm.DB, userID string) ([]models.User, error)
	GetUsers(db *gorm.DB) ([]models.User, error)
	DeleteUser(db *gorm.DB, userId uuid.UUID) error
}

type UserServiceImpl struct {
}

func NewUserService() *UserServiceImpl {
	return &UserServiceImpl{}
}

func (s *UserServiceImpl) GetUserProfileMalicious(db *gorm.DB, userID string) ([]models.User, error) {
	var user []models.User

	query := fmt.Sprintf("SELECT * FROM users WHERE id = '%s'", userID)
	result := db.Raw(query).Scan(&user)

	if result.Error != nil {
		return []models.User{}, result.Error
	}
	return user, nil
}

func (s *UserServiceImpl) GetUserProfile(db *gorm.DB, userID uuid.UUID) (models.User, error) {
	var user models.User

	result := db.Where("id = ?", userID).Find(&user)
	if result.Error != nil {
		return models.User{}, result.Error
	}

	return user, nil
}

func (s *UserServiceImpl) GetUsers(db *gorm.DB) ([]models.User, error) {
	var user []models.User

	result := db.Find(&user)
	if result.Error != nil {
		return nil, result.Error
	}

	return user, nil
}

func (s *UserServiceImpl) DeleteUser(db *gorm.DB, userId uuid.UUID) error {
	result := db.Delete(&models.User{}, "id = ?", userId)
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}
	return result.Error
}
