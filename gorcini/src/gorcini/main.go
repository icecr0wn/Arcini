package main

import (
	"fmt"

	"gorcini/resource"
	"gorcini/server"
)

func sayHello() {
	fmt.Printf("Welcome to Gorcini (Arcini Web Engine)\n")
}

func main() {
	sayHello()

	rootRes := &resource.NotFoundResource{}
	rootRes.New("/")

	characterRes := &resource.CharacterResource{}
	characterRes.New("/api/character/:name")

	m := server.Server{}
	m.New(3000)
	m.Resource(rootRes)
	m.Resource(characterRes)

	finish := make(chan bool)
	go m.Run(finish)
	<-finish
}
