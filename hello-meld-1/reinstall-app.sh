# Reinstall current MELD app using local copy of meld-clients-core
#

MCC_NODE_MODULES="../../meld-clients-core/node_modules"

if [[ "$1" == "unlink" ]]; then
    echo "Unlink meld-clients-core package..."
    rm $(npm root)/meld-clients-core
    return 0
fi

if [[ "$1" == "clean-only" ]]; then
    echo "Remove built files..."
    rm package-lock.json
    rm -rf node_modules 
    rm -rf lib
    return 0
fi

if [[ "$1" == "clean" ]]; then
    echo "Removing old package-lock.json and node_modules and lib..."
    rm package-lock.json
    rm -rf node_modules 
    rm -rf lib
    # rm $(npm root)/meld-clients-core
fi

echo "Make sure 'meld-clients-core/node_modules' is available for linking operations ..."
if [ -d ${MCC_NODE_MODULES} ]; then
    pass
elif [ -d ${MCC_NODE_MODULES}_save ]; then
    mv ${MCC_NODE_MODULES}_save ${MCC_NODE_MODULES}
else
	echo "Cannot find ' ${MCC_NODE_MODULES}' or '${MCC_NODE_MODULES}_save'" 
	return 1
fi

echo "npm link meld-clients-core ..."
npm link meld-clients-core
echo "npm install ..."
npm install
echo "npm link meld-clients-core ..."
npm link meld-clients-core

# Hide `meld-clients-core/node_modules` for running app (avoid multiple react versions)
mv ${MCC_NODE_MODULES} ${MCC_NODE_MODULES}_save

# npm start
