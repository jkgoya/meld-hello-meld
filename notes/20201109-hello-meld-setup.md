20201109-hello-meld-setup.md

## Prepare software and dependencies

These instructions assume use of a clone of the [meld-hello-meld project](https://github.com/oerc-music/meld-hello-meld).

Change to directory with the `hello-meld` app and package.json; e.g.:

    cd meld-hello-meld/hello-meld-1

Install dependencies used:

    npm install

I had errors using the latest LTS version of node (14.15.0), but when I reverted to 12.19.0 the install completed with only warnings.

    nvm install 12.19.0
    npm install


## Start development server

    npm start










