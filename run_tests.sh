#!/bin/bash

go test -v -cover common
go test -v -cover common/resource
go test -v -cover common/server
go test -v -cover gorcini
go test -v -cover gorcini/model
go test -v -cover gorcini/resource
