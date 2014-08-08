#!/bin/bash

function runTest()
{
  go test -v -cover ${name}
}

runTest "common"
runTest "common/resource"
runTest "common/server"
runTest "gorcini"
runTest "gorcini/model"
runTest "gorcini/resource"
