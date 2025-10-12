package handlers

import (
	"encoding/json"
	"gateway/internal/utils"
	"net/http"
)

type LoginRequest struct {
	Email string `json:"email"`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Generate a token for this user (mock)
	token, err := utils.GenerateJWT(req.Email)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
	})
}