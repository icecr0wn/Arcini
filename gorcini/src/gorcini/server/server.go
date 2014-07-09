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

func (s *Server) Resource(path string, resource *resource.Resource) {
	s.server.Get(path, func() string {
		return fmt.Sprintf("Hello! You are now in %v!", path)
	})
}

func (s *Server) Run(finish chan bool) {
	port := fmt.Sprintf(":%v", s.port)
	http.ListenAndServe(port, s.server)
	finish <- true
}
