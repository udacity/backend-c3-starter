package models

import (
	"time"

	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type Token struct {
	gorm.Model
	ID           uuid.UUID `json:"id" gorm:"primaryKey"`
	UserId       uuid.UUID `json:"user_id"`
	RefreshToken uuid.UUID `json:"refresh_token"`
	ExpiresAt    time.Time `json:"expires_at"`
}
