# Reinstall current MELD app using local copy of meld-clients-core
#

if [[ "$1" == "clean" ]]; then
    echo "Removing old package-lock.json and node_modules..."
    rm package-lock.json
    rm -rf node_modules 
fi

echo "npm installing..."
npm link meld-clients-core
npm install
npm link meld-clients-core
# npm start
