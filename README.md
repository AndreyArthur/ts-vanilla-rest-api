# Vanilla TypeScript RESTful API

This API is the result of a challenge that I did to myself. I was tired of typing `yarn init -y && yarn add express` for every project that I started, so I tought "If I create a RESTful API that don't use any library or framework?" and there it is.

# Documentation

## Links

<a href="#users">/users/</a>
<br />
<a href="#sessions">/sessions/</a>

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
