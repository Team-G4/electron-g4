echo
D:
cd D:\\G4X_project\\scripts\\build-scripts\\
npm i -g electron-packager && electron-packager D:\\G4X_project G4X.7 --icon=D:\\G4X_project\\res\\icons\\icon.ico --executable-name=G4X.7 --appname=G4X.7 --app-version=4.7.0 --ignore=/scripts/build-scripts --ignore=/scripts/build-scripts/build-linux.sh --ignore=/scripts/build-scripts/build-windows.bat--ignore=/scripts/build-scripts/macBuilder.sh --ignore=/scripts/build-scripts/macBuilderHelper.js --ignore= --ignore=.gitignore --ignore=README.md --ignore=CNAME --ignore=service-worker.js --ignore=G4X.iml --ignore=/.idea /node_modules --overwrite && pause
