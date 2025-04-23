package handlers

import (
	"net/http"

	"task-manager/backend/internal/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type RefreshHandler struct {
	db          *gorm.DB
	authService services.AuthService
}

type RefreshRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

func NewRefreshHandler(db *gorm.DB, authService services.AuthService) *RefreshHandler {
	return &RefreshHandler{db: db, authService: authService}
}

func (h *RefreshHandler) Refresh(c *gin.Context) {
	// Implement the refresh token logic here
	c.JSON(http.StatusOK, gin.H{
		"access_token":  "accessToken",
		"refresh_token": "refreshToken",
		"expires_in":    3600,
	})
}
