package config

import "os"

type ServiceConfig struct {
	UserServiceURL     string
	QuestionServiceURL string
	SubmitServiceURL   string
}

func LoadConfig() ServiceConfig {
	return ServiceConfig{
		UserServiceURL:     os.Getenv("USER_SERVICE_URL"),
		QuestionServiceURL: os.Getenv("QUESTION_SERVICE_URL"),
		SubmitServiceURL:   os.Getenv("SUBMIT_SERVICE_URL"),
	}
}