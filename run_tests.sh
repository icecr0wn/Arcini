#!/bin/bash

function runTest()
{
  go test -v -cover ${1}
}

runTest "common"
runTest "common/resource"
runTest "common/server"
runTest "gorcini"
runTest "gorcini/model"
runTest "gorcini/resource"
