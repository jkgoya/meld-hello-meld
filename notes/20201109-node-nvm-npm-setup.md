20201109-node-nvm-npm-setup.md

# Notes for installing and running Solid server

## Install NVM

ES6 is supported only by a more recent version of node.js than comes by default with MacOS El Capitan.  Use `nvm` to work with alternative versions of node.js.

Check if `nvm` has been installed:

    $ ls ~/.nvm

If nvm is not present, the following command installs `nvm` (to `$HOME/.nvm`?):

    $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash


## Activate NVM

Set `NVM_HOME` to point where `nvm` has been installed; e.g.

   export NVM_DIR="$HOME/.nvm" 

To activate `nvm` installed in directory `$NVM_HOME`, use:

    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

Check `nvm` command is available:

    nvm --version
    0.34.0


## Install latest node.js

To use `nvm` to install a recent version of node, use some combination of the following:

    nvm ls-remote | grep LTS
    nvm install v14.15.0    # Use appropriate recent version
    node -v

Check status:

    npm list
    /Users/graham
    └── (empty)

    npm list -g
    /Users/graham/.nvm/versions/node/v14.15.0/lib
    └─┬ npm@6.14.8
      :

    which node
    /Users/graham/.nvm/versions/node/v14.15.0/bin/node

This is what we'll use as a clean new node environment.


## Activate latest node.js

This needs to be done for each new command shell or login to activate the node version just installed:

    . ~/.nvm/nvm.sh
    . ~/.nvm/bash_completion


## On MacOS: install XCode

If not already present, install XCode from the Apple App store.  It's a big download, so may take a while.


## Proceed to setup app

See [Hello MELD application setup](./20201109-hello-meld-setup.md)





