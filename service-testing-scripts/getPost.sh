#!/bin/bash

# Initialize variables
c_flag=false
cookie=""
usage() {
    echo "Usage: $0 [-c cookie_token]"
    exit 1
}

# The colon after 'c' means that the -c option requires an argument.
while getopts "c:" flag; do
    case "${flag}" in
        c)
            c_flag=true
            cookie="${OPTARG}"
            ;;
        *)
            usage # Call usage function if an invalid flag is provided
            ;;
    esac
done

# Main logic of the script
if [ "$c_flag" = true ]; then
    echo "'-c' flag was set with cookie value ${cookie}"

    curl -X GET -b "token=${cookie}" 'http://localhost:4000/api/posts'
fi

if [ "${c_flag}" = false ]; then
    usage
fi

