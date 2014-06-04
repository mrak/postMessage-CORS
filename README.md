Braintree Meetup 6/4/2014
=========================

## Installation
```
npm i
```

## Run
To run the server and watch both client and server-side js files:
```
npm start
```

## Structure
```
├── host-public
│   ├── index.html
│   └── js
│       └── host-app.js
├── iframe-public
│   ├── index.html
│   └── js
│       └── iframe-app.js
├── index.js
├── package.json
├── routers
│   ├── assets.js
│   └── host.js
└── server.js
```

## Client
The client side javascript for both the host and iframe apps are setup to use [browserify](http://browserify.org/). 

## Pages
- _HOST_ - `http://localhost:3031`
- _IFRAME_ -  `http://localhost:3032/assets` 
