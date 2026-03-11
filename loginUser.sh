#!/bin/bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "testing", "password": "testing1234"}' http://localhost:4000/api/auth/login           
