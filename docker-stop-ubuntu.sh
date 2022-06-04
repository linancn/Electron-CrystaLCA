#!/bin/sh
cd /opt/CrystaLCA/ && docker compose -p "crystalca" stop
if [ $? -ne 0 ];then
	echo "Docker engine is not running."
else
	echo "Docker services stopped."
fi
