# Reinstall current MELD app using local copy of meld-clients-core
#

# rm package-lock.js
# rm -rf node_modules
npm install
npm link meld-clients-core
# npm link ../../meld-clients-core/node_modules/react

# npm start
    