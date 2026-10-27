#!/bin/bash

set -e

echo "🐳 Rebuild e restart do SupremeNetworkApp..."

docker compose up -d --build

echo "✅ Deploy concluído!"

docker ps --filter "name=supreme-network-app"