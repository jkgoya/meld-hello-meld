# Reinstall current MELD app using local copy of meld-clients-core
#

# For some reason, removing package-lock.json causes all sorts of warnings about obsolete packages,
# but leaving it, the next attempt to re-build completes cleanly, despite node_modules being reset.
#   rm package-lock.json

if [[ "$1" == "clean" ]]; then
    echo "Removing old package-lock.json and node_modules and lib..."
    rm package-lock.json
    rm -rf node_modules 
    rm -rf lib
fi

echo "npm installing..."
npm link meld-clients-core
npm install

echo "============================"
echo "Set meld-clients-core peer dependency links..."
npm link meld-clients-core

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

# npm start
