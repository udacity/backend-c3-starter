package handlers

import (
	"net/http"
	"task-manager/backend/internal/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AuthHandler struct {
	db          *gorm.DB
	authService services.AuthService
}

type AuthRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func NewAuthHandler(db *gorm.DB, authService services.AuthService) *AuthHandler {
	return &AuthHandler{db: db, authService: authService}
}

func (h *AuthHandler) Token(c *gin.Context) {
	// Implement the login and token generation logic here
	c.JSON(http.StatusOK, gin.H{
		"access_token":  "accessToken",
		"refresh_token": "refreshToken",
		"expires_in":    3600,
	})
}
