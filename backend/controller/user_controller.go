package controller

import (
	"context"
	"net/http"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/somearthzaza/go_plannerKMITL.git/config"
	"github.com/somearthzaza/go_plannerKMITL.git/model"
	"github.com/somearthzaza/go_plannerKMITL.git/responses"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var curriculumCollection *mongo.Collection = config.Getcollection(config.DB,"curriculum")
var SubjectCollection *mongo.Collection = config.Getcollection(config.DB , "subject")
var TypeCollection *mongo.Collection = config.Getcollection(config.DB , "type")

func GetCurriculum (c *fiber.Ctx) error{
	ctx , cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var curriculum []model.Curriculum
	defer cancel()
	result , err := curriculumCollection.Find(ctx , bson.M{})

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserRespose{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	defer result.Close(ctx)
	for result.Next(ctx){
		var single_curri model.Curriculum
		if err = result.Decode(&single_curri); err != nil{
			return c.Status(http.StatusInternalServerError).JSON(responses.UserRespose{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		curriculum = append(curriculum , single_curri)
	}

	return c.Status(http.StatusOK).JSON(responses.UserRespose{Status: http.StatusOK , Message: "success" , Data: curriculum})

}

func Getsubject (c *fiber.Ctx) error{
ctx , cancel := context.WithTimeout(context.Background(), 10*time.Second)
var subject []model.Subject
defer cancel()
result ,err := SubjectCollection.Find(ctx,bson.M{})

if err != nil{
	return c.Status(http.StatusInternalServerError).JSON(responses.UserRespose{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
}
defer result.Close(ctx)
for result.Next(ctx){
	var single_sub model.Subject
	if err = result.Decode(&single_sub); err != nil{
		return c.Status(http.StatusInternalServerError).JSON(responses.UserRespose{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}
	subject = append(subject , single_sub)

}
return c.Status(http.StatusOK).JSON(responses.UserRespose{Status: http.StatusOK , Message: "success" , Data: subject})
}

func GetType (c *fiber.Ctx) error{
	ctx , cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var TypeAll []model.AllType
	defer cancel()
	result ,err := TypeCollection.Find(ctx,bson.M{})
	
	if err != nil{
		return c.Status(http.StatusInternalServerError).JSON(responses.UserRespose{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}
	defer result.Close(ctx)
	for result.Next(ctx){
		var single_type model.AllType
		if err = result.Decode(&single_type); err != nil{
			return c.Status(http.StatusInternalServerError).JSON(responses.UserRespose{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		TypeAll = append(TypeAll ,single_type )
	
	}
	return c.Status(http.StatusOK).JSON(responses.UserRespose{Status: http.StatusOK , Message: "success" ,Data:  TypeAll})
	}
	

func GetSpecCurri (c *fiber.Ctx ) error {
	ctx , cancel := context.WithTimeout(context.Background(),10*time.Second)
	var curriculum *model.Curriculum
	var speccurri []model.Curriculum
	defer cancel()
	if err := c.BodyParser(&curriculum) ; err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.UserRespose{Status: http.StatusBadRequest , Message: "error" , Data: &fiber.Map{"data":err.Error()}})
	}
	result ,err := curriculumCollection.Find(ctx,bson.M{"curriculum_id":curriculum.Curriculum_id})
	if err != nil{
		return c.Status(http.StatusInternalServerError).JSON(responses.UserRespose{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}
	defer result.Close(ctx)
	for result.Next(ctx){
		var single_curri model.Curriculum
		if err = result.Decode(&single_curri); err != nil{
			return c.Status(http.StatusInternalServerError).JSON(responses.UserRespose{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		speccurri = append(speccurri ,single_curri )
	}
	if err != nil {
		return c.Status(http.StatusForbidden).JSON(responses.UserRespose{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}
	return c.JSON(speccurri)



}