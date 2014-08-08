package resource

import (
	"encoding/json"
	"fmt"
	"testing"
)

type Dummy struct {
	A int    `json:"a"`
	B string `json:"b"`
	C []int  `json:"c"`
}

func Test_GetFormattedJson(t *testing.T) {
	expected := "{\n\t\"a\": 7,\n\t\"b\": \"Test\",\n\t\"c\": [\n\t\t2,\n\t\t5,\n\t\t9\n\t]\n}"
	dummy := Dummy{7, "Test", []int{2, 5, 9}}

	data, error := json.Marshal(dummy)
	if nil != error {
		t.Error("Failed to parse 'type Dummy struct' to JSON.")
	}

	if expected != GetFormattedJson(data) {
		t.Error("Failed to retrieve correct formatted JSON.")
	}
}
