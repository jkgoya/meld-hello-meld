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


## Setup tests using MochaJS, ChaiJS and SinonJS

1. Activate node (see activate-node.sh in parent directory).

2. Install mocha command globally:

        npm install -g mocha

3. Install chai and sinon:

        npm install --save-dev chai
        npm install --save-dev sinon

    `chai` is assertion library.  `sinon` is "spies, stubs and mocks" library.  `--save-dev` tells npm to record the package as a "development" dependency (as opposed to "production").



## Testing notes

- https://reactjs.org/docs/testing.html


- https://mochajs.org/ - seems popular, flexible, backend and front; works with custom test libraries (via errors?)

- https://jestjs.io/ - "focus on simplicity" - Facebook-maintained - preferred for react

- https://testing-library.com/docs/react-testing-library/intro/

- https://www.chaijs.com/ - useful assertion library

- https://sinonjs.org/ - "Standalone test spies, stubs and mocks for JavaScript.  Works with any unit testing framework."


## Initial template-app creation

    npm install -g create-react-app
    npx create-react-app template-app

The final command creates a directory structure for the app, install required node and react modules, and initial boilerplate for the app.  The boilerplate uses an `<App />` component as a top level wrapper for the rendered application: this makes testing easier using the react testing libraries.






