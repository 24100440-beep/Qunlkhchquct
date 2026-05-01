#!/bin/bash

echo "============================================"
echo "Immigration Management System - Backend"
echo "============================================"
echo ""
echo "Starting Spring Boot application..."
echo ""

cd "$(dirname "$0")"
./mvnw spring-boot:run
