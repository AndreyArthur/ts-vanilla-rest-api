# Vanilla TypeScript RESTful API

This API is the result of a challenge that I did to myself. I was tired of typing `yarn init -y && yarn add express` for every project that I started, so I tought "If I create a RESTful API that don't use any library or framework?" and there it is.

# Documentation

## Links

- <a href="#users">/users/</a>
- <a href="#sessions">/sessions/</a>
- <a href="#posts">/posts/</a>

## Endpoints

- The default response for a request in a not specified endpoint is:

`404 Not Found`

```json
{
  "status": "error",
  "message": "Endpoint not found"
}
```

<div id="users"></div>

- `/users/`

  - `POST`

    - Expected request body example (API will respond with validation errors if request body doesn't match with expected):

    ```json
    {
      "name": "Hidan",
      "email": "hidan@hidan.com",
      "password": "hidan",
    }
    ```

    - Success response example:

    <code style="color: green;">201 Created</code>
    ```json
    {
      "id": "9041cb5f-31be-3ad4-16eb-633893aec7b2",
      "name": "Hidan",
      "email": "hidan@hidan.com",
      "created_at": "2021-04-11T17:36:25.715Z",
      "updated_at": "2021-04-11T17:36:25.715Z"
    }
    ```

    - Error response examples:

      - If request email is in use:

      <code style="color: red;">400 Bad Request</code>
      ```json
        {
          "status": "error",
          "message": "User already exists",
        }
      ```

  - `GET`

    - This endpoint has optional query params: `name`, `email`, `id` (that make an `OR` operation, not `AND`);

    - Success response example:

    <code style="color: green;">200 OK</code>
    ```json
    [
      {
        "id": "9041cb5f-31be-3ad4-16eb-633893aec7b2",
        "name": "Suigetsu",
        "email": "suigetsu@suigetsu.com",
        "created_at": "2021-04-07T23:09:32.314Z",
        "updated_at": "2021-04-07T23:09:32.314Z"
      },
      {
        "id": "83dcc699-682a-bbc9-a20d-c7b026e6786c",
        "name": "Karin",
        "email": "karin@karin.com",
        "created_at": "2021-04-08T00:09:05.828Z",
        "updated_at": "2021-04-08T00:09:05.828Z"
      },
      {
        "id": "ec6151f7-9b36-8830-f17a-1b9ea7f9105a",
        "name": "Sasuke",
        "email": "sasuke@sasuke.com",
        "created_at": "2021-04-11T17:36:25.715Z",
        "updated_at": "2021-04-11T17:36:25.715Z"
      }
    ]
    ```

    - There's no error responses for this endpoint, if no users are found endpoint will respond with an empty array;



<div id="sessions"></div>

- `/sessions/`

  - `POST`

    - Expected request body example (API will respond with validation errors if request body doesn't match with expected):

    ```json
    {
      "email": "konan@konan.com",
      "password": "konan",
    }
    ```

    - Success response example:

    <code style="color: green;">201 Created</code>
    ```json
    {
      "user": {
        "id": "9041cb5f-31be-3ad4-16eb-633893aec7b2",
        "name": "Konan",
        "email": "konan@konan.com",
        "created_at": "2021-04-11T17:36:25.715Z",
        "updated_at": "2021-04-11T17:36:25.715Z"
      },
      "token": "52b0cb151a5c5afcba5d6b2256202c48.0d016dedf37265748f01b56fb9ae59397575fc5ab63d9f0558c5467254d0c99a6f09f5bfefc32ec3f2276b4acb2ab5688709fe1df626325ebf2bc85eb4be4365b9150f1fad8ccf69109ac59c2a9a647cecfcaefeeb407659"
    }
    ```

    - Error response examples:

      - If user doesn't exist or password is incorrect:

      <code style="color: red;">400 Bad Request</code>
      ```json
        {
          "status": "error",
          "message": "Invaid email/password combination",
        }
      ```

  - `PUT`

    - This endpoint expect no request body;

    - This is an authenticated endpoint (if the authorization header is null or invalid it will respond with authentication errors);

    - Success response example:

    <code style="color: green;">200 OK</code>
    ```json
    {
      "user": {
        "id": "9047cf5f-31de-2ad4-d6eb-633893a5c7b2",
        "name": "Pain",
        "email": "pain@pain.com",
        "created_at": "2021-04-11T17:36:25.715Z",
        "updated_at": "2021-04-11T17:36:25.715Z"
      },
      "token": "52b0cb151a5c5afcba5d6b2256202c48.0d016dedf37265748f01b56fb9ae59397575fc5ab63d9f0558c5467254d0c99a6f09f5bfefc32ec3f2276b4acb2ab5688709fe1df626325ebf2bc85eb4be4365b9150f1fad8ccf69109ac59c2a9a647cecfcaefeeb407659"
    }
    ```

    - Error response examples:

      - If user that generates the token does not exist anymore:

      <code style="color: red;">400 Bad Request</code>
      ```json
      {
        "status": "error",
        "messages": "Token user does not exist"
      }
      ```

<div id="posts"></div>

- `/posts/`

  - `POST`

  - Expected request body example (API will respond with validation errors if request body doesn't match with expected);

  - This is an authenticated endpoint (if the authorization header is null or invalid it will respond with authentication errors)

  ```json
  {
    "title": "What does the mask hide?",
    "description": "The mask hides a sinobi's revolt."
  }
  ```

  - Success response example:

  <code style="color: green;">201 Created</code>

  ```json
  {
    "id": "8c5e1a9b-f25f-49d2-a44a-f96a9c3da606",
    "title": "What does the mask hide?",
    "description": "The mask hides a sinobi's revolt.",
    "user_id": "40733493-3c8d-6946-d923-572ad8f1c937",
    "created_at": "2021-04-15T15:49:55.290Z",
    "updated_at": "2021-04-15T15:49:55.290Z"
  }
  ```

  - Error response examples:

    - If user that generates the token does not exist anymore:

    <code style="color: red;">401 Unauthorized</code>

    ```json
    {
      "status": "error",
      "messages": "Only authenticated users can create a post"
    }
    ```
