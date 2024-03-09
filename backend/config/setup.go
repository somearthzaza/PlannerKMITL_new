package config

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var credential = options.Credential{
	Username: EnvMongoURL("mongo_user"),
	Password: EnvMongoURL("mongo_password"),
}


func ConnectDB () *mongo.Client{
	
	ctx, _ := context.WithTimeout(context.Background() , 10 * time.Second)
	client ,err := mongo.Connect(ctx , options.Client().ApplyURI(EnvMongoURL("mongo_db_url")).SetAuth(credential) )
	if err != nil{
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Print("connected to mongodb")
	return client
}

var DB *mongo.Client = ConnectDB()

func Getcollection(client *mongo.Client , collectionName string ) *mongo.Collection{
	collection := client.Database("kmitl-planner").Collection(collectionName)
	return collection
}