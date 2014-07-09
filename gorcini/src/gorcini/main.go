package main

import (
	"fmt"

	"gorcini/server"
)

func sayHello() {
	fmt.Printf("Welcome to Gorcini (Arcini Web Engine)\n")
}

func main() {
	sayHello()

	m := server.Server{}
	m.New(3000)
	m.Resource("^.*", nil)

	finish := make(chan bool)
	go m.Run(finish)
	<-finish
}
