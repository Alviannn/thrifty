# About
My personal boilerplate for working on Node.js + TypeScript + Express + PostgreSQL.

Originally this is made for the Research and Development (RnD) division in BNCC@Bandung.
But I decided to make it open-source under my account since I was the one who made it and
because I have been using it for my projects or other projects that is using this techstack.

To see the dependencies used in this boilerplate, [go here](#dependencies).

## Table of Contents
- [Entity-Relationship Diagram](#entity-relationship-diagram)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)

## Quick Start
1. Make sure you have installed [Yarn](https://classic.yarnpkg.com/lang/en/) and [PostgreSQL](https://www.postgresql.org/download/).
1. Clone the repo
   ```sh
   git clone https://github.com/Alviannn/express-ts-boilerplate.git
   ```
1. Install the dependencies
   ```sh
   yarn install
   ```
1. Duplicate the `.env.example` file to `.env` and fill the database credentials
1. Generate JWT secrets
   ```sh
   yarn jwt:generate
   ```
1. Run the dev server
   ```sh
   yarn dev
   ```

## Project Structure
```
<your project>\
 |--scripts\              # User scripts for automating
 |--src\                  # Source folder
    |--configs\           # Application configs
    |--controllers\       # Routes and controllers
        |--v1             # The first major version of the controllers
    |--database\          # Database related code
        |--entities\      # Database models/entities (represents table)
        |--datasource.ts  # TypeORM datasource configuration
    |--internals          # Internal functionalities (you will rarely touch this)
        |--decorators\    # Custom decorators
        |--routes\        # Server routes, provides automatic routing
    |--middlewares\       # Custom middlewares
    |--service\           # Business logic (service layer)
    |--typings\           # Custom types/interface for type assertion
    |--utils\             # Utility functions and/or classes
    |--validations\       # Schemas for validating JSON requests
    |--app.ts             # Express app and it's configuration
    |--server.ts          # Program entry point (include database)
 |--.eslintrc.json        # ESLint config
 |--tsconfig.json         # TypeScript compiler config
 |--...
```

## Commands
Running:
```sh
# compiles the project to `build` directory
yarn compile

# diagnose the TS compiler
yarn compile:debug

# starts the program (must be compiled first)
yarn start

# Runs the server in Development environment (no compiled files)
yarn dev
```

Data seeding:
```sh
# Add a bunch of prepared data in `seeder.ts` file
yarn seed
```

Cleans the compiled files (in `build` directory):
```sh
yarn clean
```

Linting:
```sh
# runs ESLint to `src` directory
yarn lint

# fixes ESLint errors (for fixable errors only)
yarn lint:fix
```

TypeORM:
```sh
# shows TypeORM commands
yarn typeorm -h

# shows migration status
yarn migration:show

# generates a migration based recent schema changes
yarn migration:generate <migration-name>

# creates a new migration
yarn migration:create <migration-name>

# runs all pending migrations
yarn migration:run

# reverts all migrations
yarn migration:revert
```

JSONWebToken:
```sh
# generate JWT secrets (both access and refresh secrets)
yarn jwt:generate
```

## Environment Variables
Found in the `.env` file
```sh
# the JWT secrets
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

# access token expire time
JWT_ACCESS_EXPIRE=15m
# refresh token expire time
JWT_REFRESH_EXPIRE=30d

# the postgres database credentials
DB_HOST=
DB_PORT=5432
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

## Dependencies
1. [express](https://www.npmjs.com/package/express) <br>
   * Node.js minimal backend framework.
1. [cors](https://www.npmjs.com/package/cors) <br>
   * Middleware to enable CORS (Cross-origin resource sharing).
   * Allows the frontend devs to access the backend.
1. [helmet](https://www.npmjs.com/package/helmet)
   * Secures the backend HTTP headers.
1. [compression](https://www.npmjs.com/package/compression)
   * Compression middleware.
   * It compresses the server response with GZIP, the client will then receive the responses in smaller size of data.
1. [http-status-codes](https://www.npmjs.com/package/http-status-codes) <br>
   * To avoid _magic numbers_ and use constants enum. Ex: Using `BAD_REQUEST` instead of `400`.
1. [joi](https://www.npmjs.com/package/joi) <br>
   * Library for validating JSON, making it easy to make sure all (or certain) properties exists and valid.
1. [luxon](https://www.npmjs.com/package/luxon) <br>
   * Better date and time library than the default `Date` from JS.
   * Why not `momentjs`? Because it has stopped it's development, [check here](https://momentjs.com/docs/#/-project-status/) and I personally like it.
1. [pg](https://www.npmjs.com/package/pg) <br>
   * PostgreSQL database for our backend projects, although we won't be using this directly, but through `typeorm`.
1. [typeorm](https://www.npmjs.com/package/typeorm) <br>
   * ORM (Object-relational mapping) library for Node.js.
   * Helps us to access the database without a need to write SQL queries.
     * It can prevent typos in SQL query.
     * It can make cleaner codes.
     * It's perfect for TypeScript.
1. [bcrypt](https://www.npmjs.com/package/bcrypt) <br>
   * Securing passwords easily, it hashes and also adds salt to it.
   * It's a bad practice to store passwords in plain-text, [this forum explains why it's bad](https://security.stackexchange.com/q/120540).
1. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) <br>
    * Token based user authentication, we need to know whether user is logged in or not.
1. [ts-node](https://www.npmjs.com/package/ts-node)
    * Able to execute TypeScript Node.js without compiling.
    * It's used in development environment.
1. [cross-env](https://www.npmjs.com/package/cross-env)
    * Run Node.js scripts with custom environment without the need of .env.
    * In Unix based OS, it's easy to achieve this even without `cross-env`,
      but for Windows users it's trickier.
1. [morgan](https://www.npmjs.com/package/morgan)
    * A logger middleware for HTTP request.
    * It logs the event for each requests.
1. [winston](https://www.npmjs.com/package/winston)
    * Flexible logger for anything and everything.
    * It's the main logger with `morgan`, and it's as powerful as ever.