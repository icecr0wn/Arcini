package resource

import (
	"bytes"
	"encoding/json"
)

func getFormattedJson(data []uint8) string {
	var out bytes.Buffer
	json.Indent(&out, data, "", "\t")
	return out.String()
}
