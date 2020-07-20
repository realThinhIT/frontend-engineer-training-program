# Frontend Engineering Training Program

## Installation and Setup

1. Install [Node.js](https://nodejs.org/en/) on your machine.

2. Clone this project.
    ```
    $ mkdir ~/gotit-catalog-frontend
    $ cd ~/gotit-catalog-frontend
    $ git clone https://github.com/realThinhIT/gotit-catalog-frontend.git .
    ```

3. Install project dependencies:
    ```
    $ npm install
    ```

## Setup and Configurations

1. Open `.dotenv.*` files and modify your configurations as needed. Default environments are `dev`, `prod`.
Default configurations are located in `src/config`.

2. Modify these variables as your desired setup:
  - `API_BASE_URL` (String): Base URL for your API endpoints, defining without ending slashes.
  - `PAGINATION_ITEMS_PER_PAGE` (Int): Numbers of items per page (by default).

## Environments

All commands are `REACT_APP_ENV` required. Please specify one before running your commands.

The environments are `prod`, `dev`.

Set environment for the terminal session or for each commands:

```
$ REACT_APP_ENV={prod/dev} [command]
```

## Up and Running

### Development

```
$ REACT_APP_ENV=dev npm start
```

You can access your application at `http://localhost:3000`.

Or you can specify a `PORT` environment variable with your choice.


### Testing

Use the following command to run tests. All tests are located in corresponding `__tests__` folders.

After running this command, you'll get tests results (passed, failed, warning) in your terminal.

All tests are run in `test` environment by default.

```
$ npm run test
```

### Production/ Build

```
$ REACT_APP_ENV=prod npm run build
```

**Notes:** The `.htaccess` file contains route rewriting rules for `react-router`. Copy it into your distrubution folder after build process completed.

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!