#! /bin/sh

## Set git users to the commit we are building from
git config user.name "$(git --no-pager log --format=format:'%an' -n 1)"
git config user.email "$(git --no-pager log --format=format:'%ae' -n 1)"

git checkout update-node-matrix || git checkout -b update-node-matrix
