package server

import (
	"fmt"
	"net/http"

	"github.com/go-martini/martini"

	"common/resource"
)

type Server struct {
	server *martini.Martini
	port   int
}

func NewServer(port int) *Server {
	return &Server{martini.New(), port}
}

func (s *Server) Resource(resource resource.Resourcer) {
	router := martini.NewRouter()

	router.Get(resource.Path(), resource.Get)
	router.Post(resource.Path(), resource.Post)
	router.Put(resource.Path(), resource.Put)
	router.Delete(resource.Path(), resource.Delete)

	s.server.Action(router.Handle)
}

func (s *Server) Run(finish chan bool) {
	port := fmt.Sprintf(":%v", s.port)
	http.ListenAndServe(port, s.server)
	finish <- true
}
