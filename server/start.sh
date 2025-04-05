#!/bin/sh
# Запуск миграций и сервера
bunx prisma migrate deploy
bun -r module-alias/register ./dist/src/index.js