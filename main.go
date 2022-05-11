package main

// https://github.com/google/go-github#authentication
import (
	"context"

	"github.com/richardsnider/github-client/cmd"
	"github.com/richardsnider/github-client/pkg/http"
	log "github.com/sirupsen/logrus"
)

func main() {
	log.SetFormatter(&log.JSONFormatter{})
	ctx := context.Background()
	http.InitClient(ctx)

	cmd.Execute()

}
