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

Create a university
```
mutation {
  createUniversity(createUniversityInput: {
    name: "University of Colorado, Boulder",
    city: {
      name: "Boulder",
      state: {
        name: "Colorado",
      }
    }
  }) {
    id
    name
    city {
      id
      name
      state {
        id
        name
      }
    }
  }
}
```

Updating a university
```
mutation {
  updateUniversity(updateUniversityInput: {
    id: 19,
    name: "Gadsden State Community Collegio",
    city: {
      name: "Gadsdensensens",
      state: {
        name: "Massachusetts",
      }
    }
  }) {
    name
    id
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

## Authentication & Authorization

the `create` and `update` mutations are protected and can only be accessed with the appropriate header indicating that the user is an admin. I had begun to implement User-based authentication with Role-based authorization, but ran out of time so I patched together a simple auth guard in the `roles.guard.ts` file, which checks to ensure the request has the appropriate header before granting access to the protected endpoint. To access the endpoint, add the following header to your mutation:

```
{
  "authorization": "suerspecialsecretsauce"
}
```

## Notes on DX

To provide a better developer experience, the create mutation does not require or accept ids as input. The code will instead derive the ids from the existing university, city, and state names – then automatically generate new ids as necessary. This has the added benefit of making sure that the client cannot break the consistency of the database by passing in incorrect combinations of name and id.

Similarly, fields in the input of the `update` mutation are optional. To make an update, the developer needs only provide the relevant fields they wish to update, and can leave the unchanging fields blank.

## Notes on Database Structure

I made some assumptions in structuring the database: 

– Each University has a unique ID, and is stored with a reference to its corresponding city.

– City names are not necessarily unique – e.g. we can have Springfield, Missouri with id 1, and Springfield, Oregon with id 2.

– Each state has a unique name and ID.

Because of this, if we were using the universities.json file as a non-relational database, we would have to iterate through the entire list of universities every time we wanted to create a new university. This is not optimal, so I created some additional models `states`, `latest-city-id`, and `latest-state-id` which mimic aspects of a relational database. If we were using a real database, this would allow us to create universities in O(1) time. As it is, using json we still have to duplicate our entire model every time we want to update it anyway, so not much gained for time complexity – but this still demonstrates the theory.

The `universities.json` file is still the single source of truth for data in our database. To make it easier to keep everything up to date, I have created a script `npm run update-models`, which updates all the other models to match the data in `universities.json`. This is useful if you need to make a manual change to `universities.json`.