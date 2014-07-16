package resource

import (
	"github.com/go-martini/martini"
)

type NotFoundResource struct {
	path string
}

func (r *NotFoundResource) New(path string) {
	r.path = path
}

func (r *NotFoundResource) Path() string {
	return r.path
}

func (r *NotFoundResource) Get(parameters martini.Params) (int, string) {
	return 404, "NOT FOUND"
}

func (r *NotFoundResource) Post(parameters martini.Params) (int, string) {
	return 404, "POST"
}

func (r *NotFoundResource) Put(parameters martini.Params) (int, string) {
	return 404, "PUT"
}

func (r *NotFoundResource) Delete(parameters martini.Params) (int, string) {
	return 404, "DELETE"
}
