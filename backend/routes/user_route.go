package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/somearthzaza/go_plannerKMITL.git/controller"
)

func UserRoute (app *fiber.App){
	app.Get("/curriculum" , controller.GetCurriculum)
	app.Get("/subject", controller.Getsubject)
	app.Get("/type",controller.GetType)
	app.Post("/speccuri" , controller.GetSpecCurri)
}
