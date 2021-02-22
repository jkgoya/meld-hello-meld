# Hello MELD (3)

This is the third minimal "Hello MELD" app.  It reads a graph file  `Hello_MELD.jsonld` and uses that to get URIs of an MEI-encoded score and MP3 file using the MELD core react libraries.

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

Ideally, all the should be needed is this:

        npm install

***But*** we've found there are subtle dependencies, which mean the standard npm dependency evaluation doesn't work.  So there are scripts that *seem* to navigate around the problems (for now).

In the local `meld-clients-core` directory, run:

    . build-meld-clients-core-lib.sh clean

(If there is already a clean local install of `meld-clients-core`, this step may be unnecessary.)

Then in the current (`hello-meld-3`) directory run:

    . reinstall-app.sh clean

See the script source files for details of how the applications are installed.


5. Run the server:

        npm start

6. Browse to http://localhost:8080


## Running with local copy of meld-clients-core project files

1. In local copy of meld-clients-core:

        npm install
        npm run build
        npm link
        rm package-lock.js
        rm -rf node_modules   # or mv node_modules node_modules_save

2. In this project

        # rm package-lock.js
        # rm -rf node_modules
        npm install
        npm link meld-clients-core  # Note: after install?
        npm start



.......


git clone git@github.com:trompamusic/clara
cd clara
git checkout clara200

cd your/meld-clients-core/copy
git pull
git checkout with-lib

do the npm link dance



