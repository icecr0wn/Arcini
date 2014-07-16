package server

import (
	"fmt"
	"net/http"

	"github.com/go-martini/martini"

	"gorcini/resource"
)

type Server struct {
	server *martini.ClassicMartini
	port   int
}

func (s *Server) New(port int) *Server {
	s.server = martini.Classic()
	s.port = port
	return s
}

func (s *Server) Resource(resource resource.Resourcer) {
	fmt.Printf("Adding resource for: %v\n", resource.Path())
	s.server.Get(resource.Path(), resource.Get)
	s.server.Post(resource.Path(), resource.Post)
	s.server.Put(resource.Path(), resource.Put)
	s.server.Delete(resource.Path(), resource.Delete)
}

func (s *Server) Run(finish chan bool) {
	port := fmt.Sprintf(":%v", s.port)
	http.ListenAndServe(port, s.server)
	finish <- true
}
