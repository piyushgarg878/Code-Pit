package handlers

import (
	"gateway/internal/config"
	"gateway/internal/utils"
	"net/http"
)

func HandleUserRoutes(cfg config.ServiceConfig) http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/users/", func(w http.ResponseWriter, r *http.Request) {
		target := cfg.UserServiceURL + r.URL.Path
		resp, err := utils.ForwardRequest(r.Method, target, r.Body, map[string]string{
			"Content-Type": r.Header.Get("Content-Type"),
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadGateway)
			return
		}
		utils.CopyResponse(w, resp)
	})
	return mux
}