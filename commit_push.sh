#! /bin/sh

git add .github/workflows/tmp-test.yml
git commit -m "Updated node matrix to $1"
git push $(git remote get-url origin | sed "s/https:\/\/github.com/https:\/\/$GITHUB_ACTOR:$GITHUB_TOKEN@github.com/") update-node-matrix
