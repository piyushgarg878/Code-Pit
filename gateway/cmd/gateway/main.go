package main

import (
	"fmt"
	"gateway/internal/config"
	"gateway/internal/router"
	"net/http"
	"os"
)

func main() {
	cfg := config.LoadConfig()

	port := os.Getenv("GATEWAY_PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("🚀 API Gateway running on port %s\n", port)
	http.ListenAndServe(":"+port, router.SetupRoutes(cfg))
}