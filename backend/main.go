package main

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

func getClients(_ echo.Context, app *pocketbase.PocketBase) ([]map[string]interface{}, error) {
	clients := app.SubscriptionsBroker().Clients()
	users := make(map[string]map[string]interface{})

	for _, client := range clients {
		record, ok := client.Get(apis.ContextAuthRecordKey).(*models.Record)
		if ok {
			id := record.Get("id").(string)
			users[id] = map[string]interface{}{
				"id":   id,
				"name": record.Get("name"),
			}
		} else {
			log.Printf("Client %s is not authenticated", client.Id())
		}
	}

	// Convert the users map to a slice.
	usersSlice := make([]map[string]interface{}, 0, len(users))
	for _, user := range users {
		usersSlice = append(usersSlice, user)
	}

	return usersSlice, nil
}

func computeETag(usersSlice []map[string]interface{}) string {
	sortUsers(usersSlice)
	jsonData, _ := json.Marshal(usersSlice)
	eTag := fmt.Sprintf("%x", md5.Sum(jsonData))
	return eTag
}

func sortUsers(usersSlice []map[string]interface{}) {
	// Sort the users by id.
	for i := 0; i < len(usersSlice); i++ {
		for j := i + 1; j < len(usersSlice); j++ {
			if usersSlice[i]["id"].(string) > usersSlice[j]["id"].(string) {
				usersSlice[i], usersSlice[j] = usersSlice[j], usersSlice[i]
			}
		}
	}
}

func checkETag(c echo.Context, eTag string) bool {
	if match := c.Request().Header.Get("If-None-Match"); match != "" {
		log.Printf("If-None-Match: %s", match)
		if strings.Contains(match, eTag) {
			log.Printf("ETag matches: %s", eTag)
			return true
		}
	}
	return false
}

func setupRoutes(app *pocketbase.PocketBase) {
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/clients", func(c echo.Context) error {
			defer func() {
				if r := recover(); r != nil {
					log.Printf("Recovered from panic: %v", r)
					_ = c.JSON(http.StatusInternalServerError, map[string]string{"error": "Internal Server Error"})
				}
			}()

			usersSlice, err := getClients(c, app)
			if err != nil {
				return err
			}

			eTag := computeETag(usersSlice)
			if checkETag(c, eTag) {
				return c.NoContent(http.StatusNotModified)
			}

			c.Response().Header().Set("ETag", eTag)
			return c.JSON(http.StatusOK, usersSlice)
		})

		e.Router.GET("/health", func(c echo.Context) error {
			return c.NoContent(http.StatusOK)
		})

		return nil
	})

}

func startApp(app *pocketbase.PocketBase) {
	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func main() {
	app := pocketbase.New()
	setupRoutes(app)
	startApp(app)
}
