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
	return 404, "GET NOT FOUND"
}

func (r *NotFoundResource) Post(parameters martini.Params) (int, string) {
	return 404, "POST NOT FOUND"
}

func (r *NotFoundResource) Put(parameters martini.Params) (int, string) {
	return 404, "PUT NOT FOUND"
}

func (r *NotFoundResource) Delete(parameters martini.Params) (int, string) {
	return 404, "DELETE NOT FOUND"
}
