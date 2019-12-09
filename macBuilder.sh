
electron-packager ./ --overwrite --out=./output/ --icon=./icon.icns --platform=darwin --arch=x64 --prune=true --ignore=.idea --ignore=.gitignore --ignore=README.md --ignore=macBuilder.sh --ignore=icon.ico --ignore=.git --ignore=icon.icns --ignore=dmgicon.icns --ignore=background.png --ignore=.gitignore
node macBuilderHelper.js
echo "DMG written into the ready folder."