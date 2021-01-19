# Hello MELD (1)

This is a minimal "Hello MELD" app that really just loads the React framework and uses it to display "Hello MELD".  It's intended to provide the supporting React framework without getting tangled with any MELD specifics (that comes later).

The code is a stripped-down version of [TROMPA's `selectable-=score-demo`](https://github.com/trompamusic/selectable-score-demo).


## Setup

1. Activate node (see activate-node.sh in parent directory).

2. If necessary, remove old node-modules and package-lock.json:

        rm -rf ./node-modules
        rm package-lock.json

3. Install

        npm install

4. Run the server:

        npm start

5. Browse to http://localhost:8080


## Run tests using MochaJS, ChaiJS

Note that there are numerous additional packages required for testing.  These are included via the package.json file as `devDependencies`.

1. Activate node (see activate-node.sh in parent directory).

2. Install mocha command globally:

        npm install -g mocha

3. Install software and tests

        npm install

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


## Run tests using Jest and react-testing-library

    npm install --save-dev babel-jest @babel/preset-env @babel/preset-react

    npm install --save-dev @testing-library/react
    npm install --save-dev @testing-library/jest-dom

    npm install -g jest

The last 3 commands should be covered by `npm install`.

NOTE: jest oitself is installed bvy react-scripts, and is reportedly very version-sensitive,

If tests are Javascript files in a subdirectory `__test__`, they are run using:

    jest


## Other notes

### Initial template-app creation

    npm install -g create-react-app
    npx create-react-app template-app

The final command creates a directory structure for the app, install required node and react modules, and initial boilerplate for the app.  The boilerplate uses an `<App />` component as a top level wrapper for the rendered application: this makes testing easier using the react testing libraries.

### Testing notes

- https://reactjs.org/docs/testing.html

- https://mochajs.org/ - seems popular, flexible, backend and front; works with custom test libraries (via errors?)

- https://jestjs.io/ - "focus on simplicity" - Facebook-maintained - preferred for react

- https://testing-library.com/docs/react-testing-library/intro/

- https://www.chaijs.com/ - useful assertion library

- https://sinonjs.org/ - "Standalone test spies, stubs and mocks for JavaScript.  Works with any unit testing framework."

