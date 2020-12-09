# Hello MELD (2)

This is the second minimal "Hello MELD" app.  It loads and displays an MEI-encoded score using the MELD core react libraries.

The code is based on `hello-meld-1`, which in turn is a stripped-down version of [TROMPA's `selectable-score-demo`](https://github.com/trompamusic/selectable-score-demo).

There is also a dependency on Apple's XCode, and requires to agree licences:

    sudo xcodebuild -license

(Why this is sudo, I can't imagine)

## Setup

1. Activate node (see activate-node.sh in parent directory).

2. Ensure XCode is installed and licences agreed:

        sudo xcodebuild -license

3. If necessary, remove old node-modules and package-lock.json:

        rm -rf ./node-modules
        rm package-lock.json

4. Install

        npm install

   The following may also be required:

        cd node_modules/meld-core-clients
        npm run build
        cd ../..


5. Run the server:

        npm start

6. Browse to http://localhost:8080



## Running with local copy of meld-clients-core project files

1. In local copy of meld-clients-core:

        npm install
        npm run build
        npm link
        rm package-lock.js
        rm -rf node_modules

2. In hello-meld-2 project

        # rm package-lock.js
        # rm -rf node_modules
        npm install
        npm link meld-clients-core  # Note: after install?
        npm start

@@TEST these instructions again

