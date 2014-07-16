package main

import (
	"fmt"

	"gorcini/server"
	"gorcini/resource"
)

func sayHello() {
	fmt.Printf("Welcome to Gorcini (Arcini Web Engine)\n")
}

func main() {
	sayHello()
	
	rootRes := &resource.NotFoundResource{}
	rootRes.New("/");

	m := server.Server{}
	m.New(3000)
	m.Resource(rootRes)

	finish := make(chan bool)
	go m.Run(finish)
	<-finish
}
