package handlers

import (
	"net/http"
	"task-manager/backend/internal/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserHandler struct {
	db          *gorm.DB
	userService services.UserService
}

func NewUserHandler(db *gorm.DB, userService services.UserService) *UserHandler {
	return &UserHandler{db: db, userService: userService}
}

func (h *UserHandler) GetUserProfile(c *gin.Context) {
	// Implement the logic to get the user profile
	c.JSON(http.StatusOK, "user profile")
}

func (h *UserHandler) GetUserProfileByUserId(c *gin.Context) {
	// Implement the logic to get the user profile by user ID
	c.JSON(http.StatusOK, "user profile by user ID")
}

func (h *UserHandler) GetUsers(c *gin.Context) {
	// Implement the logic to get all users
	c.JSON(http.StatusOK, "users list")
}

func (h *UserHandler) DeleteUser(c *gin.Context) {
	// Implement the logic to delete a user
	c.JSON(http.StatusNoContent, nil)
}
