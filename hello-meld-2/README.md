# Hello MELD (2)

This is the second minimal "Hello MELD" app.  It loads and displays an MEI-encoded score and an MP3 audio resource using the MELD core react libraries.

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

        cd node_modules/meld-clients-core
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
        rm package-lock.json
        rm -rf node_modules   # or mv node_modules node_modules_save

    (Or use script `build-meld-clients-core-lib.sh` in that package.)

2. In hello-meld-2 project

        # rm package-lock.js
        # rm -rf node_modules
        npm install
        npm link meld-clients-core  # Note: after install?
        npm start


## Run tests using Jest and react-testing-library

    npm install --save-dev babel-jest @babel/preset-env @babel/preset-react

    npm install --save-dev @testing-library/react
    npm install --save-dev @testing-library/jest-dom

    npm install -g jest

The first 3 commands should be covered by `npm install`.

NOTE: jest itself is installed by react-scripts, and is reportedly very version-sensitive,

If tests are Javascript files in a subdirectory `__test__`, they are run using:

    jest


## Run tests using MochaJS, ChaiJS

Note that there are numerous additional packages required for testing.  These are included via the package.json file as `devDependencies`.

1. Activate node (see activate-node.sh in parent directory).

2. Install mocha command globally:

        npm install -g mocha

3. Install software and tests


5. Build software, build and run tests

        npm run build
        npm test

    Test run should look like this:

        $ npm test

        > hello-meld-1@0.0.1 test /Users/graham/workspace/github/oerc-music/meld-hello-meld/hello-meld-1
        > mocha lib/tests/test-hello-meld.js

          Test hello-meld-1
            ✓ Check rendering of top-level <App> element

          1 passing (514ms)



## Use Verovio to generate MEI from Musescore MusicXML

The Verovio web site includes a MusicXML converter:

- https://www.verovio.org/musicxml.html

For options used when loading the resulting MEI, see:

- https://www.verovio.org/command-line.xhtml

These are reflected as entries in vrvOptions in App.js

See discussion at https://meld-music.slack.com/archives/CGD53LR9U/p1606816538268500.  Specifically, to use line breaks as set up by MuseScore, include `breaks: 'line'` in the `vrvOptions` value.

