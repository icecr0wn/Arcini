package resource

import (
	"encoding/json"

	"github.com/go-martini/martini"

	"gorcini/model"
)

type CharacterResource struct {
	path string
}

func (r *CharacterResource) New(path string) {
	r.path = path
}

func (r *CharacterResource) Path() string {
	return r.path
}

func (r *CharacterResource) Get(parameters martini.Params) (int, string) {
	// @todo Get character from storage...
	character := model.Character{parameters["name"], []int{3, 0, 2, 0, 0}, []int{0, 0, 0, 0, 0}, model.Deity{"Name", "Title", []int{3, 0, 2, 0, 0}, []int{3, 0, 2, 0, 0}}}

	data, error := json.Marshal(character)
	if nil != error {
		return 500, error.Error()
	}

	return 200, getFormattedJson(data)
}

func (r *CharacterResource) Post(parameters martini.Params) (int, string) {
	return 500, ""
}

func (r *CharacterResource) Put(parameters martini.Params) (int, string) {
	return 500, ""
}

func (r *CharacterResource) Delete(parameters martini.Params) (int, string) {
	return 500, ""
}
