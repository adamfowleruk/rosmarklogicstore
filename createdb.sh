#!/bin/sh


curl -v --anyauth --user admin:admin -X POST \
    -d'{"rest-api":{"name":"rostestdb-rest-9898","database": "rostestdb","modules-database": "rostestdb-modules","port": 9898}}' \
    -H "Content-type: application/json" \
    "http://localhost:8002/v1/rest-apis"
