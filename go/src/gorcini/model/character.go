package model

type Character struct {
	Name            string `json:"name"`
	BaseAttributes  []int  `json:"base"`
	SpentAttributes []int  `json:"spent"`
	ChosenDeity     Deity  `json:"deity"`
}
