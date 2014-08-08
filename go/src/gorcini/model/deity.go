package model

type Deity struct {
	Name        string `json:"name"`
	Title       string `json:"title"`
	Attributes  []int  `json:"attributes"`
	Resistances []int  `json:"resistances"`
}

const defaultDeityName string = "Unknown"

func NewDeity(name string, title string, attributes []int, resistances []int) *Deity {
	if "" == name {
		name = defaultDeityName
	}

	if MaxAttributes != len(attributes) || MaxAttributes != len(resistances) {
		return nil
	}

	return &Deity{name, title, attributes, resistances}
}
