package resource

import (
	"bytes"
	"encoding/json"
)

func GetFormattedJson(data []uint8) string {
	var out bytes.Buffer
	json.Indent(&out, data, "", "\t")
	return out.String()
}
