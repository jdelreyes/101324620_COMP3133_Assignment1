# GraphQL Intro

## Installation

1. Install dependencies.

  ```shell
  npm i
  ```

2. Duplicate `.env.template` file.

  ```shell
  cp .env.template .env
  ```

## Running

1. Instantiate a MongoDB Docker image and run it.

  ```shell
  npm run db:dev:up
  ```

2. Run Express server and Apollo server.

  ```shell
  npm run dev
  ```

## Testing

1. Navigate to <http://localhost:8000/graphql> ideally using `Postman`.

2. Query `signup` mutation and retrieve `token` to use as an HTTP Authorization Header.

  ```graphql
  mutation Signup {
    signup(email: $email, userName: $userName, password: $password) {
        token
    }
  }
  ```

3. Trigger `employee` endpoints as an authorized user.