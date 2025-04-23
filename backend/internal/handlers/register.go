package handlers

import (
	"errors"
	"net/http"

	"task-manager/backend/internal/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var ErrDuplicateUsername = errors.New("username already exists")

type RegisterHandler struct {
	db              *gorm.DB
	registerService services.RegisterService
}

func NewRegisterHandler(db *gorm.DB, registerService services.RegisterService) *RegisterHandler {
	return &RegisterHandler{db: db, registerService: registerService}
}

func (h *RegisterHandler) Registration(c *gin.Context) {
	// Implement the registration logic here
	c.JSON(http.StatusCreated, gin.H{"message": "user created successfully"})
}
