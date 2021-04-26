# Hello MELD (4)

This is the fourth minimal "Hello MELD" app.  This attempts to reproduce the functionality of the "selectable-score" app (with simple annotations) in the hello MELD framework

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

        npm install   # WARNING: this doesn't currently work:
                      # Use sequence below instead of this command

5. Run the server:

        npm start

6. Browse to http://localhost:8080

