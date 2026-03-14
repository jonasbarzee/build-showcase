#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "testing1234", "password": "testing1234"}' http://localhost:4000/api/auth/create
