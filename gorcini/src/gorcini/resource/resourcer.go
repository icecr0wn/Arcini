package resource

import (
	"github.com/go-martini/martini"
)

type Resourcer interface {
	Path() string
	Get(parameters martini.Params) (int, string)
	Post(parameters martini.Params) (int, string)
	Put(parameters martini.Params) (int, string)
	Delete(parameters martini.Params) (int, string)
}
