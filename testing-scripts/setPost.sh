#!/bin/bash

# Initialize variables
c_flag=false
cookie=""
p_flag=false
post=""
usage() {
    echo "Usage: $0 [-c cookie_token]"
    exit 1
}

# The colon after 'c' means that the -c option requires an argument.
while getopts "c:p:" flag; do
    case "${flag}" in
        c)
            c_flag=true
            cookie="${OPTARG}"
            ;;
        p)
            p_flag=true
            post="${OPTARG}"
            ;;
        *)
            usage # Call usage function if an invalid flag is provided
            ;;
    esac
done

# Main logic of the script
if [[ "$c_flag" = true &&  "$p_flag" = true ]] ; then
    echo "'-c' flag was set with cookie value ${cookie}"
    echo "'-p' flag was set with value ${post}"

    curl -X POST -b "token=${cookie}" -H 'Content-Type: application/json' \
        -d '{"id": "1", "picture": "testing", "content": "this is a test"}' \
        'http://localhost:4000/api/posts'
fi

if [ "${c_flag}" = false ]; then
    usage
fi

