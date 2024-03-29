﻿# lost-found-api

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
REQEST_LIMIT_TIMEOUT=xxxx
REQEST_NUMBER_LIMIT=xxxx
# BCRYPT config
BCRYPT_SALT_ROUNDS=xx
BCRYPT_PASSWORD_PEPPER=xxxx
# JWT config
JWT_SECRET=xxxxx
JWT_EXPIRES_IN=xxxx
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

- [ ] Add tests ✅
- [ ] Add more endpoints ⏳
- [ ] Add more documentation ⏳
- [ ] Create a frontend ⏳

## Endpoints

- API endpoints is live at `https://lost-found-api.onrender.com` for testing.

### Users

The following endpoints are used to manage users:

- `GET /api/v1/users/:id` - Show a user ✅
- `GET /api/v1/users/:id/avatar` - Get user avatar ✅
- `POST /api/v1/users/signup` - Create a new user ✅
- `POST /api/v1/users/authenticate` - Authenticate a user ✅
- `POST /api/v1/users/avatar` - Upload user avatar ✅
- `PATCH /api/v1/users/:id` - Update a user ✅
- `DELETE /api/v1/users/:id` - Delete a user ✅
- `DELETE /api/v1/users/avatar` - Delete user avatar ✅

### Items

The following endpoints are used to manage items:

- `GET /api/v1/items` - Get all items ✅
- `GET /api/v1/items/:id` - Show item ✅
- `GET /api/v1/items/:id/image` - Get item image ✅
- `GET /api/v1/items/user/:id` - Get user items ✅
- `POST /api/v1/items` - Create item ✅
- `POST /api/v1/items/:id/image` - Upload item image ✅
- `PATCH /api/v1/items/:id` - Update item ✅
- `DELETE /api/v1/items/:id` - Delete item ✅

### Users endpoints documentation is live at `https://lost-found-api.onrender.com` for testing.

- `POST /api/v1/users/signup` - Create a new user 📌✅

  - Authorization: None

  - Request body:

    - `phoneNumber`
      - Type: `string`
      - Required: `true`
      - Example: `01234567899`
      - length: `11`
    - `password`
      - Type: `string`
      - Required: `true`
      - Example: `9696`
      - length: `min:4, max:50 characters`
    - `name`
      - Type: `string`
      - Required: `true`
      - Example: `MOHAMMED`
      - length: `min:2, max:20 characters`
    - `city`
      - Type: `string`
      - Required: `false`
      - Example: `Alexandria`
      - length: `min:2, max:20 characters`
    - `country`
      - Type: `string`
      - Required: `false`
      - Example: `Egypt`
      - length: `min:2, max:20 characters`

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

- `POST /api/v1/users/authenticate` - Authenticate a user 📌✅

  - Authorization: None

  - Request body:

    - `phoneNumber`
      - Type: `string`
      - Required: `true`
      - Example: `01234567899`
      - length: `11`
    - `password`
      - Type: `string`
      - Required: `true`
      - Example: `9696`
      - length: `min:2, max:50 characters`

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `User authenticated successfully`
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

- `GET /api/v1/users/:id` - Show a user 📌✅

  - Authorization: None

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `User retrieved successfully`
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

- `PATCH /api/v1/users/:id` - Update a user 📌✅

  - Authorization: `Bearer token`

  - Request body:

    - `name`
      - Type: `string`
      - Required: `false`
      - Example: `MOHAMMED`
      - length: `min:2, max:20 characters`
    - `city`
      - Type: `string`
      - Required: `false`
      - Example: `Alexandria`
      - length: `min:2, max:20 characters`
    - `country`
      - Type: `string`
      - Required: `false`
      - Example: `Egypt`
      - length: `min:2, max:20 characters`
    - `phoneNumber`
      - Type: `string`
      - Required: `false`
      - Example: `01234567899`
      - length: `11`
    - `password`
      - Type: `string`
      - Required: `false`
      - Example: `9696`
      - length: `min:2, max:50 characters`

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `User Updated successfully`
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

- `DELETE /api/v1/users/:id` - Delete a user 📌✅

  - Authorization: `Bearer token`

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `User deleted successfully`

- `POST /api/v1/users/avatar` - Upload user avatar 📌✅

  - Authorization: `Bearer token`

  - Request body:

    - `avatar`
      - Type: `file`
      - Required: `true`
      - Example: `avatar.png`

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `Avatar uploaded successfully`
    - `data`
      - `avatar`
        - Type: `string`
        - Example: `https://yourdomain.com/api/v1/users/6351f0b8ae4d15d6d911b417/avatar`

- `DELETE /api/v1/users/avatar` - Delete user avatar 📌✅

  - Authorization: `Bearer token`

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `Image removed successfully`

- `GET /api/v1/users/:id/avatar` - Get user avatar 📌✅

  - Authorization: `Bearer token`

  - Response body:
    - `image`

### Items endpoints documentation is live at `https://lost-found-api.onrender.com` for testing.

- `GET /api/v1/items` - Get all items 📌✅

  - Note: This endpoint is paginated & supports sorting, filtering, and searching (very generic)

  - Use-Case: Recently added items, oldest items, related items, suggested items, etc.

  - EX:

    - `/api/v1/items?limit=3&page=2&sortBy=createdAt&order=desc`

  - Authorization: none

  - Query parameters:

    - `page`
      - Type: `number`
      - Required: `false`
      - Example: `page=1`
    - `limit`
      - Type: `number`
      - Required: `false`
      - Example: `limit=10`
    - `sortBy`
      - Type: `string`
      - Required: `false`
      - Accepted-values: `createdAt | updatedAt`
      - Example: `sortBy=createdAt`
    - `order`
      - Type: `string`
      - Required: `false`
      - Accepted-values: `asc | desc`
      - Example: `order=desc`

  - Request body:

    - `name`
      - Type: `string`
      - Required: `false`
      - Example: `MOHAMMED`
      - length: `min:2, max:50 characters`
    - `city`
      - Type: `string`
      - Required: `false`
      - Example: `Alexandria`
      - length: `min:2, max:20 characters`
    - `country`
      - Type: `string`
      - Required: `false`
      - Example: `Egypt`
      - length: `min:2, max:20 characters`

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `Items fetched successfully`
    - `data`
      - `items`
        - `id`
        - `name`
        - `description`
        - `category`
        - `creator`
        - `image`
        - `city`
        - `country`
        - `createdAt`
        - `updatedAt`

- `GET /api/v1/items/:id` - Show item 📌✅

  - Authorization: none

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `Item fetched successfully`
    - `data`
      - `item`
        - `id`
        - `name`
        - `description`
        - `category`
        - `creator`
        - `image`
        - `city`
        - `country`
        - `createdAt`
        - `updatedAt`

- `POST /api/v1/items` - Create item 📌✅

  - Authorization: `Bearer token`

  - Request body:

    - `name`
      - Type: `string`
      - Required: `true`
      - Example: `Iphone 11`
      - length: `min:2, max:50 characters`
    - `description`
      - Type: `string`
      - Required: `false`
      - Example: `I found this item in the street at 10:00 am`
      - length: `min:2, max:200 characters`
    - `category`
      - Type: `string`
      - Required: `true`
      - Example: `mobile`
      - Accepted-values: `mobile | laptop | keys | id | document | money | tablet | watch | camera | other |`
    - `city`
      - Type: `string`
      - Required: `true`
      - Example: `Alexandria`
      - length: `min:2, max:20 characters`
    - `country`
      - Type: `string`
      - Required: `true`
      - Example: `Egypt`
      - length: `min:2, max:20 characters`
    - `creator`
      - Type: `string`
      - Required: `true`
      - Example: `6353252d287fb9b38a22ab57`

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `Item created successfully`
    - `data`
      - `item`
        - `id`
        - `name`
        - `description`
        - `category`
        - `creator`
        - `image`
        - `city`
        - `country`
        - `createdAt`
        - `updatedAt`

- `PATCH /api/v1/items/:id` - Update item 📌✅

  - Authorization: `Bearer token`

  - Request body:

    - `name`
      - Type: `string`
      - Required: `false`
      - Example: `Iphone 11`
      - length: `min:2, max:50 characters`
    - `description`
      - Type: `string`
      - Required: `false`
      - Example: `I found this item in the street at 10:00 am`
      - length: `min:2, max:200 characters`
    - `category`
      - Type: `string`
      - Required: `false`
      - Example: `mobile`
      - Accepted-values: `mobile | laptop | keys | id | document | money | tablet | watch | camera | other |`
      - length: `min:2, max:20 characters`
    - `city`
      - Type: `string`
      - Required: `false`
      - Example: `Alexandria`
      - length: `min:2, max:20 characters`
    - `country`
      - Type: `string`
      - Required: `false`
      - Example: `Egypt`
      - length: `min:2, max:20 characters`
    - `creator`
      - Type: `string`
      - Required: `false`
      - Example: `6353252d287fb9b38a22ab57`

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `Item updated successfully`
    - `data`
      - `item`
        - `id`
        - `name`
        - `description`
        - `category`
        - `creator`
        - `image`
        - `city`
        - `country`
        - `createdAt`

- `DELETE /api/v1/items/:id` - Delete item 📌✅

  - Authorization: `Bearer token`

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `Item deleted successfully`

- `POST /api/v1/items/:id/image` - Upload item image 📌✅

  - Authorization: `Bearer token`

  - Request body:

    - `image`
      - Type: `file`
      - Required: `true`
      - Accepted-types: `image/jpg | image/jpeg | image/png`
      - Example: `image.png`

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `Item image uploaded successfully`
    - `data`
      - `Image`

- `GET /api/v1/items/:id/image` - Get item image 📌✅

  - Authorization: none

  - Response body:
    - `data`
      - `Image`

- `GET /api/v1/items/user/:id` - Get user items 📌✅

  - EX:

    - `/api/v1/items/user/:id?limit=2&page=1&sort=createdAt&order=asc`

  - Authorization: none

  - Query parameters:

    - `page`
      - Type: `number`
      - Required: `false`
      - Example: `page=1`
    - `limit`
      - Type: `number`
      - Required: `false`
      - Example: `limit=10`
    - `sortBy`
      - Type: `string`
      - Required: `false`
      - Accepted-values: `createdAt | updatedAt`
      - Example: `sortBy=createdAt`
    - `order`
      - Type: `string`
      - Required: `false`
      - Accepted-values: `asc | desc`
      - Example: `order=desc`

  - Response body:
    - `status`
      - Type: `string`
      - Example: `success`
    - `message`
      - Type: `string`
      - Example: `Items fetched successfully`
    - `data`
      - `items`
        - `id`
        - `name`
        - `description`
        - `category`
        - `creator`
        - `image`
        - `city`
        - `country`
        - `createdAt`
        - `updatedAt`
