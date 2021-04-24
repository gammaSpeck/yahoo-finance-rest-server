# yahoo-finance-rest-server [![GitHub license](https://img.shields.io/github/license/gammaSpeck/yahoo-finance-rest-server)](https://github.com/gammaSpeck/yahoo-finance-rest-server/blob/master/LICENSE) ![GitHub top language](https://img.shields.io/github/languages/top/gammaSpeck/yahoo-finance-rest-server) ![David](https://img.shields.io/david/gammaSpeck/yahoo-finance-rest-server)

This is a simple REST Express API server that is a wrapper around the [Yahoo Finance APIs](https://rapidapi.com/apidojo/api/yahoo-finance1/endpoints).

Some of the things this repo highlights:

- Modularity of code
- Robust custom logging module
- Error handling sync and async
- AJV for request validation using JSON Schema
- Webpack for good compiling & compression of code
- Dual stage docker builds for smallest image sizes (~122MB)
- Good usage of **tsconfig.paths.json** to eliminate deep relative imports

## Prerequisites

1. Get your Yahoo Finance API by signing up here - [API Keys.](https://docs.rapidapi.com/docs/keys) Its free!
2. Now, go add this API of yours in the [src/configs/index.ts](./src/configs/index.ts) **rapidAPIKey** key's fallback value [Do NOT commit this :p]

```ts
  rapidAPIKey: process.env.RAPID_API_KEY || 'YOUR_DEV_API_KEY_GOES_HERE',
```

## Getting started

```sh
  > yarn # Installs all the packages
  > yarn dev # Runs the express app locally on localhost:3000
```

## Deployment

You can run the production build on a simple docker container on your local machine.

```sh
  # In the root of this directory
  > docker build -t yf-apis-image .
  # Starts a container named yf-server and exposes the port 3000
  > docker run -it -p 3000:3000 --name yf-server
```

## Testing

So far, only two APIs have been exposed in this service:

1. GET Auto-Complete : More info on [Autocomplete API docs](https://rapidapi.com/apidojo/api/yahoo-finance1?endpoint=5c3da178e4b0cc6cdc0ed65f)
2. GET Stock analysis: More info on [Get v2 Stock analysis API](https://rapidapi.com/apidojo/api/yahoo-finance1?endpoint=apiendpoint_5bdfea14-a708-4492-a9c1-fe4b90cc3ffd)

> Here is my POSTMAN collection to get you started: [YF Server API Collection](https://www.getpostman.com/collections/bb6498dc6fadd7ebecec)

## Things to do

- Add test cases
- Add Swagger.io OpenAPI3 Documentation
