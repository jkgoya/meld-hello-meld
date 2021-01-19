# Reinstall current MELD app using local copy of meld-clients-core
#

# For some reason, removing package-lock.json causes all sorts of warnings about obsolete packages,
# but leaving it, the next attempt to re-build completes cleanly, despite node_modules being reset.
#   rm package-lock.json

rm -rf node_modules
npm link meld-clients-core
npm install
npm link meld-clients-core

# npm start
