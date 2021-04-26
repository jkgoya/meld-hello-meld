# Reinstall current MELD app using local copy of meld-clients-core
#

MCC_PACKAGE="../../meld-clients-core"
MCC_NODE_MODULES="${MCC_PACKAGE}/node_modules"


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
    echo "${MCC_NODE_MODULES} found"
elif [ -d ${MCC_NODE_MODULES}_save ]; then
    mv ${MCC_NODE_MODULES}_save ${MCC_NODE_MODULES}
else
	echo "Cannot find ' ${MCC_NODE_MODULES}' or '${MCC_NODE_MODULES}_save'" 
	return 1
fi

# echo "npm link meld-clients-core ..."
# npm link meld-clients-core
# echo "npm --no-save install verovio ..."
# npm  --no-save install verovio
# echo "mkdir node_modules ..."
# mkdir node_modules

echo "npm install ..."
npm install

echo "mv node_modules/meld-clients-core node_modules/meld-clients-core-save ..."
mv node_modules/meld-clients-core node_modules/meld-clients-core-save

echo "cp -a  ${MCC_PACKAGE} node_modules ..."
cp -a  ${MCC_PACKAGE} node_modules

echo "rm -rf node_modules/meld-clients-core/node_modules ..."
rm -rf node_modules/meld-clients-core/node_modules

# echo "mv node_modules/meld-clients-core/node_modules/ node_modules/meld-clients-core/node_modules_save ..."
# mv node_modules/meld-clients-core/node_modules/ node_modules/meld-clients-core/node_modules_save

# echo "============================"
# echo "Set meld-clients-core peer dependency links ..."
# npm link meld-clients-core
# npm install ../../meld-clients-core

# npm -g remove react
# npm -g remove react-dom
# npm -g remove react-redux


# echo "============================ react"
# (cd node_modules/react/lib/; npm link)

# echo "============================ react-dom"
# (cd node_modules/react-dom/lib/; npm link)

# echo "============================ react-redux"
# (cd node_modules/react-redux/lib/; npm link)

# echo "============================ link meld-clients-core"
# npm link meld-clients-core


# Hide `meld-clients-core/node_modules` for running app (avoid multiple react versions)
# mv ${MCC_NODE_MODULES} ${MCC_NODE_MODULES}_save

# npm start
