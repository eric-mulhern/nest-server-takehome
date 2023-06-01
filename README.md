## Description

University Microservice: 

This service is an API which provides information on our list of universities, and their associated cities and states. 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Testing the API

The API can be accessed from http://localhost:3000/graphql.

Here are some example queries/mutations:


Get a list of all universities:
```
{
  universities {
    id
    name
    city {
      name
      id
      state {
        name
        id
      }
    }
  }
}
```



Get a university by its ID, with the name of its associated city:
```
{
  university(id: 2) {
    name
    id
    city {
      name
    }
  }
}
```
