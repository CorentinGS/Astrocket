package main

import (
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
	"log"
	"net/http"
)

func main() {
	app := pocketbase.New()

	// OnBeforeServe adds a function to be executed before the server starts serving.
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// Define a GET route for the "/clients" endpoint.
		e.Router.GET("/clients", func(c echo.Context) error {
			defer func() {
				if r := recover(); r != nil {
					log.Printf("Recovered from panic: %v", r)
					_ = c.JSON(http.StatusInternalServerError, map[string]string{"error": "Internal Server Error"})
				}
			}()

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
				}
			}
			// Convert the users map to a slice.
			usersSlice := make([]map[string]interface{}, 0, len(users))
			for _, user := range users {
				usersSlice = append(usersSlice, user)
			}

			// Return the users slice as a JSON response with a status of 200 OK.
			return c.JSON(http.StatusOK, usersSlice)
		})

		// Return nil to indicate that no error occurred.
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
