#!/usr/bin/env bash
set -e

echo "Cleaning old reports..."
rm -rf playwright-report test-results

echo "Building and running tests in Docker..."
docker compose -f config/docker-compose.yml up --build --abort-on-container-exit

echo ""
echo "Tests finished. HTML report is available at:"
echo "  playwright-report/index.html"
