package model

type Deity struct {
	Name        string `json:"name"`
	Title       string `json:"title"`
	Attributes  []int  `json:"attributes"`
	Resistances []int  `json:"resistances"`
}
