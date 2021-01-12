# Reinstall current MELD app using local copy of meld-clients-core
#

rm package-lock.js
rm -rf node_modules
npm link meld-clients-core
npm install
npm link meld-clients-core

# npm start
