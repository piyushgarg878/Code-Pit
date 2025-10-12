package router

import (
	"gateway/internal/config"
	"gateway/internal/handlers"
	"gateway/internal/middleware"
	"net/http"
)

func SetupRoutes(cfg config.ServiceConfig) http.Handler {
	mux := http.NewServeMux()

	// Auth routes (no middleware)
	mux.HandleFunc("/api/auth/login", handlers.LoginHandler)

	// Protected routes
	mux.Handle("/api/users/", middleware.JWTAuth(handlers.HandleUserRoutes(cfg)))
	mux.Handle("/api/questions/", middleware.JWTAuth(handlers.HandleQuestionRoutes(cfg)))
	mux.Handle("/api/submit/", middleware.JWTAuth(handlers.HandleSubmitRoutes(cfg)))

	return mux
}