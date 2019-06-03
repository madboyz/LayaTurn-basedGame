rm -rf ./dist
mkdir dist
mkdir -p ./dist/libs/
mkdir -p ./dist/res/
mkdir -p ./dist/res/img/
cp index.html ./dist/
cp bundle.js ./dist/
cp libs/all_lib.min.js ./dist/libs/
cp -rf ./res/* ./dist/res/
cp -rf ./dist/* ../../xhackerweb/hexgun/
cd ../../xhackerweb/
sh complie.sh