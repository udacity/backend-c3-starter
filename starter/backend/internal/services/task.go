package services

import (
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type TaskService interface {
	CreateTask(db *gorm.DB) error
	UpdateTask(db *gorm.DB, taskID uuid.UUID) error
	DeleteTask(db *gorm.DB, taskID uuid.UUID) error
	GetTaskByID(db *gorm.DB, taskID uuid.UUID) error
	GetTasksByUser(db *gorm.DB, userID uuid.UUID) error
	GetTasks(db *gorm.DB) error
}
type TaskServiceImpl struct {
}

func NewTaskService() *TaskServiceImpl {
	return &TaskServiceImpl{}
}
