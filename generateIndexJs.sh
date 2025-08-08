#!/bin/bash

# Define the directory to scan
SONGS_DIRECTORY="./public/songs"

# Define the output JSON file
OUTPUT_FILE="./public/songs/index.json"

# Check if the directory exists
if [ ! -d "$SONGS_DIRECTORY" ]; then
  echo "Error: Directory '$SONGS_DIRECTORY' not found."
  exit 1
fi

# Initialize the JSON array
echo "[" > "$OUTPUT_FILE"

# Counter for formatting
first_entry=true

# Loop through each file in the directory
for file in "$SONGS_DIRECTORY"/*; do
  if [ -f "$file" ]; then # Check if it's a regular file
    filename=$(basename "$file")

    # Skip the index.json file itself
    if [ "$filename" == "index.json" ]; then
      continue
    fi

    # Add a comma before all entries except the first one
    if [ "$first_entry" = false ]; then
      echo "," >> "$OUTPUT_FILE"
    fi

    # Append the filename to the JSON array
    echo "    \"$filename\"" >> "$OUTPUT_FILE"
    first_entry=false
  fi
done

# Close the JSON array and object
echo "]" >> "$OUTPUT_FILE"

echo "Successfully generated '$OUTPUT_FILE' with song names from '$SONGS_DIRECTORY', excluding 'index.json'."