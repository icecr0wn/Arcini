#!/bin/bash

function runTest()
{
  go test -v -cover ${name}
}

runTest("common")
runTest("common")
runTest("common")
runTest("common")
go test -v -cover common/resource
go test -v -cover common/server
go test -v -cover gorcini
go test -v -cover gorcini/model
go test -v -cover gorcini/resource
