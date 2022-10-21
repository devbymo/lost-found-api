# lost-found-api

## Description

This is a simple API to manage lost and found items. It is built using Node.js, Express, and MongoDB. It is a RESTful API that uses JSON Web Tokens for authentication. It is a work in progress and is not yet complete.

## ENV Variables

The following environment variables are required:

```
# ENV info
PORT=3000
NODE_ENV=dev
# DB connection info
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST_PROD=lost-found-api
DB_HOST_TEST=lost-found-api-test
DB_HOST_DEV=lost-found-api-dev
# CORS config
CORS_ORIGIN=https://yourdomain.com
# REQ limit
REQEST_LIMIT_TIMEOUT=900000
REQEST_NUMBER_LIMIT=100
# BCRYPT config
BCRYPT_SALT_ROUNDS=10
BCRYPT_PASSWORD_PEPPER=secret-pepper
# JWT config
JWT_SECRET=secret-jwt
JWT_EXPIRES_IN=7d
# URL
DEV_URL=http://localhost:3000
PROD_URL=https://yourdomain.com


```

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server
4. Run `npm test` to run the tests
5. Run `npm run dev` to start the server in development mode
6. Run `npm run lint` to run the linter
7. Run `npm run format` to format the code using Prettier
8. Run `npm run build` to build the project for production
9. Run `npm run clean` to remove the build directory

## TODO

- [ ] Add tests
- [ ] Add more endpoints
- [ ] Add more documentation
- [ ] Create a frontend

## Endpoints

### Auth

- `POST /api/v1/users/signup` - Create a new user

  - Request body:

    - `phoneNumber`
      - Type: `string`
      - Required: `true`
      - Example: `+2348123456789`
      - length: `13`
    - `password`
      - Type: `string`
      - Required: `true`
      - Example: `9696`
      - length: `min 4 characters`
    - `name`
      - Type: `string`
      - Required: `true`
      - Example: `MOHAMMED`
      - length: `min 2 characters`
    - `city`
      - Type: `string`
      - Required: `false`
      - Example: `Alexandria`
      - length: `min 2 characters`
    - `country`
      - Type: `string`
      - Required: `false`
      - Example: `Egypt`
      - length: `min 2 characters`

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `User created successfully`
    - `data`
      - `token`
        - Type: `string`
      - `user`
        - `id`
        - `name`
        - `phoneNumber`
        - `city`
        - `country`
        - `avatar`

- `POST /api/v1/users/login` - Login an existing user

### Lost Items

The following endpoints are used to manage lost items:

- `GET /api/v1/lost` - Get all lost items
- `GET /api/v1/lost/:id` - Get a single lost item
- `POST /api/v1/lost` - Create a new lost item
- `PUT /api/v1/lost/:id` - Update a lost item
- `DELETE /api/v1/lost/:id` - Delete a lost item

### Found Items

The following endpoints are used to manage found items:

- `GET /api/v1/found` - Get all found items
- `GET /api/v1/found/:id` - Get a single found item
- `POST /api/v1/found` - Create a new found item
- `PUT /api/v1/found/:id` - Update a found item
- `DELETE /api/v1/found/:id` - Delete a found item

### Users

The following endpoints are used to manage users:

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get a single user
- `POST /api/v1/users` - Create a new user
- `PUT /api/v1/users/:id` - Update a user
- `DELETE /api/v1/users/:id` - Delete a user
