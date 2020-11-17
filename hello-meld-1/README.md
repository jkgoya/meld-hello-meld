# Hello MELD (1)

This is a minimal "Hello MELD" app that really just loads the React framework and uses it to display "Hello MELD".  It's intended to provide the supporting React framework wthout getting tangled with any MELD specifics (that comes later).

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

