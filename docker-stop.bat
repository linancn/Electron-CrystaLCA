@echo off
docker compose -p "crystalca" stop
if %errorlevel% == 0 ( echo Docker stopped. ) else ( echo Docker is not running.)
