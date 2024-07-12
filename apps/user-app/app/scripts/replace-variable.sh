#!/bin/sh
# replace-variables.sh

# Define a space-separated list of environment variables to check and replace
VARIABLES="NEXT_PUBLIC_NETBANKING_URL NEXT_PUBLIC_SIGNUP_NETBANKING_URL NEXT_PUBLIC_NETBANKING_SECRET NEXT_PUBLIC_WEBSOCKET_URL NEXT_PUBLIC_SERVER_WEBHOOK_URL"

# Check if each variable is set
for VAR in $VARIABLES; do
    if [ -z "$(eval echo \$$VAR)" ]; then
        echo "$VAR is not set. Please set it and rerun the script."
        exit 1
    fi
done

 

# Find and replace BAKED values with real values
find public .next -type f -name "*.js" |
while read -r file; do
    for VAR in $VARIABLES; do
        sed -i "s|BAKED_$VAR|$(eval echo \$$VAR)|g" "$file"
    done
done