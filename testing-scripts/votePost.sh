#!/bin/bash

c_flag=false
cookie=""

usage() {
    echo "Usage: $0 [-c cookie_token]"
    exit 1
}

while getopts "c:" flag; do
    case "${flag}" in
        c)
            c_flag=true
            cookie="${OPTARG}"
            ;;
        *)
            usage
            ;;
    esac
done

if [[ "$c_flag" = false ]] ; then
    usage
fi

# Define the JSON payload in a variable using a Heredoc
# We use quotes around "EOF" to prevent Bash from trying to expand variables inside the JSON
read -r -d '' PAYLOAD <<EOF
{"type":"upvotes","action":"cast"}
EOF

echo "'-c' flag was set with cookie value ${cookie}"

# Pass the variable to curl
curl -i -X PUT \
     -b "token=${cookie}" \
     -H 'Content-Type: application/json' \
     -d "$PAYLOAD" \
     "http://localhost:4000/api/posts/1/vote"
