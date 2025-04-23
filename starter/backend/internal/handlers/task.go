package handlers

import (
	"errors"
	"net/http"

	"task-manager/backend/internal/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type TaskHandler struct {
	db          *gorm.DB
	taskService services.TaskService
}

func NewTaskHandler(db *gorm.DB, taskService services.TaskService) *TaskHandler {
	return &TaskHandler{db: db, taskService: taskService}
}

func (h *TaskHandler) CreateTask(c *gin.Context) {
	// Implement task creation logic here

	c.JSON(http.StatusCreated, gin.H{"message": "task created successfully"})
}

func (h *TaskHandler) UpdateTask(c *gin.Context) {
	// Implement task update logic here

	c.JSON(http.StatusOK, gin.H{"message": "task updated successfully"})
}

func (h *TaskHandler) DeleteTask(c *gin.Context) {

	c.JSON(http.StatusNoContent, nil)
}

func (h *TaskHandler) GetTaskByID(c *gin.Context) {

	c.JSON(http.StatusOK, "task by id")
}

func (h *TaskHandler) GetTasksByUser(c *gin.Context) {

	c.JSON(http.StatusOK, "tasks list by user")
}

func (h *TaskHandler) GetTasks(c *gin.Context) {

	c.JSON(http.StatusOK, "tasks list")
}

func handleTaskError(c *gin.Context, err error) {
	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "task not found",
		})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to process task request",
		})
	}
}
