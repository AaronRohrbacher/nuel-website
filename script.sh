#!/bin/bash
shopt -s globstar
rm -rf pre-build
rm -rf build
gulp compile-scss
gulp compile-html
cd pre-build
absolute_path="$PWD"
for dir in **/; do
    title=$(jq .page.title config-title-meta.json)
    replace {{title}} "$title" *
    echo "$dir"
    cd "$absolute_path/$dir"
    if test -f ./config-title-meta.json; then
        title=$(jq .page.title config-title-meta.json)
    else
        title=$(jq .page.title ../config-title-meta.json)
    fi
    replace {{title}} "$title" *
    cd $absolute_path
done
gulp build-css
gulp build-html
gulp build-js
cd ..
cp assets/fonts build/assets -r
cp assets/img build/assets -r
