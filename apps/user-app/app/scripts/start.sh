#!/bin/sh
# start.sh

# Replace runtime env vars and start next server
 
sh app/scripts/replace-variable.sh  && 
npm run start