package resource

import (
	"github.com/go-martini/martini"
)

type Resource struct {
	path string
}

func (r *Resource) New(path string) {
	r.path = path
}

func (r *Resource) Path() string {
	return r.path
}

func (r *Resource) Get(parameters martini.Params) (int, string) {
	return 200, "GET"
}

func (r *Resource) Post(parameters martini.Params) (int, string) {
	return 200, "POST"
}

func (r *Resource) Put(parameters martini.Params) (int, string) {
	return 200, "PUT"
}

func (r *Resource) Delete(parameters martini.Params) (int, string) {
	return 200, "DELETE"
}




