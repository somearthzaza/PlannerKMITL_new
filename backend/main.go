package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/somearthzaza/go_plannerKMITL.git/config"
	"github.com/somearthzaza/go_plannerKMITL.git/routes"
)


func main () {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Content-Type,Origin,Accept",
	}))
	config.ConnectDB()

	routes.UserRoute(app)

	app.Listen(":8080")
}