package handlers

import (
	"gateway/internal/config"
	"gateway/internal/utils"
	"net/http"
)

func HandleSubmitRoutes(cfg config.ServiceConfig) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/submit/", func(w http.ResponseWriter, r *http.Request) {
		target := cfg.SubmitServiceURL + r.URL.Path
		resp, err := utils.ForwardRequest(r.Method, target, r.Body, nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadGateway)
			return
		}
		utils.CopyResponse(w, resp)
	})
	return mux
}