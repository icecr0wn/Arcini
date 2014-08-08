package main

import (
	"fmt"

	"common/server"

	"gorcini/resource"
)

func sayHello() {
	fmt.Printf("Welcome to Gorcini (Arcini Web Engine)\n")
}

func main() {
	sayHello()

	m := server.NewServer(80)
	m.Resource(resource.NewCharacterResource("/api/character/:name"))

	finish := make(chan bool)
	go m.Run(finish)
	<-finish
}
