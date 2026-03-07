<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<br />
<div align="center">
  <h3 align="center">Project Structure API</h3>

  <p align="center">
    A production-ready project template for building RESTful APIs with TypeScript, Express, and Sequelize
    <br />
    <br />
    <a href="https://github.com/arifintahu/project-structure-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/arifintahu/project-structure-api/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#architecture">Architecture</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api-reference">API Reference</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

## About The Project

A clean, scalable Node.js API boilerplate with proper separation of concerns. Built with modern tooling (Node 22+, TypeScript 5.7, ESLint 9) and best practices including typed error handling, pagination, environment validation, and comprehensive unit tests.

### Built With

| Category      | Technology                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| **Runtime**   | [Node.js](https://nodejs.org/) v22+                                                                           |
| **Language**  | [TypeScript](https://www.typescriptlang.org/) 5.7                                                             |
| **Framework** | [Express.js](https://expressjs.com/) 4.x                                                                      |
| **ORM**       | [Sequelize](https://sequelize.org/) 6.x                                                                       |
| **Database**  | [PostgreSQL](https://www.postgresql.org/)                                                                     |
| **Auth**      | [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) + [bcrypt](https://www.npmjs.com/package/bcrypt) |
| **Docs**      | [Swagger](https://swagger.io/) (swagger-jsdoc + swagger-ui-express)                                           |
| **Testing**   | [Jest](https://jestjs.io/) + [ts-jest](https://kulshekhar.github.io/ts-jest/)                                 |
| **Linting**   | [ESLint](https://eslint.org/) 9 (flat config) + [Prettier](https://prettier.io/)                              |

### Features

- **Layered architecture** — Routes → Controllers → Services → Repositories → Models
- **Typed error handling** — Custom `AppError` hierarchy with proper HTTP status codes
- **Consistent API responses** — `ApiResponse` utility for uniform success/error responses
- **Pagination** — Built-in paginated list endpoints with `?page=1&limit=10`
- **Password hashing** — Automatic bcrypt hashing via Sequelize model hooks
- **Environment validation** — Required env vars checked at startup with clear errors
- **JWT authentication** — Token-based auth with role-based access control
- **Swagger documentation** — Auto-generated API docs at `/docs/v1`
- **Pre-commit hooks** — Husky + lint-staged for ESLint and Prettier on commit

<p align="right">(<a href="#top">back to top</a>)</p>

## Architecture

```
Request → Route → Middleware (auth, validation) → Controller → Service → Repository → Model → DB
                                                      ↓
                                               ApiResponse (success/error)
```

| Layer            | Responsibility                                 | Example                              |
| ---------------- | ---------------------------------------------- | ------------------------------------ |
| **Routes**       | HTTP method + URL mapping, middleware chaining | `POST /api/v1/users`                 |
| **Middlewares**  | Auth, validation, error handling, logging      | `Auth.authenticate`, `Validate(...)` |
| **Controllers**  | Parse request, call service, send response     | `UserController.createUser`          |
| **Services**     | Business logic, validation rules               | `UserService.createUser`             |
| **Repositories** | Database queries via Sequelize                 | `UserRepository.getUsers`            |
| **Models**       | Schema definition, hooks, associations         | `User`, `Role`                       |

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

- **Node.js** v22 or higher
- **PostgreSQL** server running
- **npm** (comes with Node.js)

### Installation

1. **Clone or use as template**

    ```sh
    git clone https://github.com/arifintahu/project-structure-api.git
    cd project-structure-api
    ```

    Or click [**Use this template**](https://github.com/arifintahu/project-structure-api/generate) on GitHub.

2. **Install dependencies**

    ```sh
    npm ci
    ```

3. **Configure environment**

    ```sh
    cp .env.example .env
    ```

    Edit `.env` with your database credentials:

    ```env
    NODE_ENV=development
    APP_NAME=my-project
    SERVER=development
    PORT=3001
    SECRET=your-secret-key

    DB_HOST=localhost
    DB_DATABASE=mydb
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_PORT=5432
    DB_DIALECT=postgres
    DB_TIMEZONE=Asia/Jakarta
    DB_LOG=true
    ```

    > **Required vars**: `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`. The app will fail fast with a clear error if any are missing.

4. **Build the project**

    ```sh
    npm run build
    ```

5. **Sync database tables**

    ```sh
    npm run sync-db
    ```

6. **Start the server**

    ```sh
    npm run start
    ```

    For development with auto-reload:

    ```sh
    npm run start-watch
    ```

7. **Open Swagger docs** at [http://localhost:3001/docs/v1](http://localhost:3001/docs/v1)

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

### Adding a New Resource

Follow this pattern to add a new resource (e.g., `Product`):

1. **Model** — Create `src/api/models/Product.ts` with Sequelize schema
2. **Repository interface** — Create `src/api/repositories/interfaces/IProductRepository.ts`
3. **Repository** — Create `src/api/repositories/ProductRepository.ts`
4. **Service interface** — Create `src/api/services/interfaces/IProductService.ts`
5. **Service** — Create `src/api/services/ProductService.ts`
6. **Controller** — Create `src/api/controllers/ProductController.ts`
7. **Validation** — Add rules in `src/api/middlewares/validator/requirements/`
8. **Routes** — Create `src/api/routes/v1/products.ts` and register in `src/api/routes/v1/index.ts`
9. **Swagger** — Add JSDoc annotations in `docs/`
10. **Tests** — Add `__test__/` folders in repositories and services

### Error Handling

Use typed errors in services for proper HTTP status codes:

```typescript
import { NotFoundError, ConflictError } from '../../errors/AppError';

// 404 - Resource not found
throw new NotFoundError('Product not found');

// 409 - Conflict (duplicate)
throw new ConflictError('Product SKU must be unique');

// 401 - Unauthorized
throw new UnauthorizedError('Invalid credentials');

// 403 - Forbidden
throw new ForbiddenError('Insufficient permissions');

// 422 - Validation error
throw new ValidationError('Invalid input data');
```

### API Responses

Controllers use `ApiResponse` for consistent response format:

```typescript
import ApiResponse from '../../utils/response/ApiResponse';

// Standard response
ApiResponse.success(res, 'Product created', product, 201);

// Paginated response
ApiResponse.paginated(res, 'Products fetched', paginatedResult);
```

**Response formats:**

```json
// Success
{ "message": "Product created", "data": { ... } }

// Paginated
{ "message": "Products fetched", "items": [...], "total": 50, "page": 1, "limit": 10, "totalPages": 5 }

// Error
{ "message": "Product not found", "statusCode": 404 }
```

### Pagination

List endpoints accept query parameters:

```
GET /api/v1/users?page=2&limit=20
```

Default: `page=1`, `limit=10`.

### Available Scripts

| Script                    | Description                       |
| ------------------------- | --------------------------------- |
| `npm run start`           | Start the server                  |
| `npm run start-watch`     | Start with auto-reload (nodemon)  |
| `npm run build`           | Compile TypeScript to `dist/`     |
| `npm run build-watch`     | Compile with watch mode           |
| `npm run test`            | Run tests with coverage           |
| `npm run test:noCoverage` | Run tests without coverage        |
| `npm run lint`            | Run ESLint                        |
| `npm run prettier`        | Format code with Prettier         |
| `npm run sync-db`         | Sync Sequelize models to database |

<p align="right">(<a href="#top">back to top</a>)</p>

## API Reference

### Authentication

| Method | Endpoint         | Description               | Auth |
| ------ | ---------------- | ------------------------- | ---- |
| `POST` | `/api/v1/login`  | Login with email/password | No   |
| `POST` | `/api/v1/signup` | Register new user         | No   |

### Users

| Method   | Endpoint                        | Description            | Auth  |
| -------- | ------------------------------- | ---------------------- | ----- |
| `GET`    | `/api/v1/users?page=1&limit=10` | List users (paginated) | Admin |
| `POST`   | `/api/v1/users`                 | Create user            | Admin |
| `GET`    | `/api/v1/users/:id`             | Get user details       | Admin |
| `PUT`    | `/api/v1/users/:id`             | Update user            | Admin |
| `DELETE` | `/api/v1/users/:id`             | Delete user            | Admin |

### Roles

| Method | Endpoint        | Description | Auth  |
| ------ | --------------- | ----------- | ----- |
| `GET`  | `/api/v1/roles` | List roles  | Admin |
| `POST` | `/api/v1/roles` | Create role | Admin |

> Use `Authorization: Bearer <token>` header for authenticated endpoints.

<p align="right">(<a href="#top">back to top</a>)</p>

## Testing

```sh
# Run all tests with coverage
npm test

# Run without coverage
npm run test:noCoverage

# Run specific test file
npx jest src/api/services/__test__/UserService.test.ts
```

Tests use `jest.mock()` to isolate layers. Each service and repository has a `__test__/` folder with unit tests and shared mock resources.

<p align="right">(<a href="#top">back to top</a>)</p>

## Project Structure

```
├── .husky/                         # Git hooks (pre-commit: lint-staged)
├── docs/                           # Swagger API documentation
├── src/
│   ├── @types/                     # Custom type declarations
│   ├── api/
│   │   ├── controllers/            # Request handling, response formatting
│   │   ├── middlewares/
│   │   │   ├── auth/               # JWT authentication & role checking
│   │   │   ├── handlers/           # Global error handler
│   │   │   ├── morgan/             # HTTP request logging
│   │   │   └── validator/          # Input validation (express-validator)
│   │   ├── models/                 # Sequelize models & type definitions
│   │   ├── repositories/
│   │   │   ├── interfaces/         # Repository contracts
│   │   │   └── *.ts                # Data access layer
│   │   ├── routes/v1/              # API route definitions
│   │   ├── services/
│   │   │   ├── interfaces/         # Service contracts
│   │   │   ├── __test__/           # Service unit tests
│   │   │   └── *.ts                # Business logic layer
│   │   └── types/                  # Request DTOs & pagination types
│   ├── config/
│   │   ├── appConfig.ts            # Centralized configuration
│   │   └── validateEnv.ts          # Startup environment validation
│   ├── constants/                  # App-wide constants
│   ├── database/                   # DB connection & table sync
│   ├── errors/
│   │   └── AppError.ts             # Typed error class hierarchy
│   ├── utils/
│   │   ├── jwt/                    # JWT sign/verify helpers
│   │   ├── logger/                 # Winston logger
│   │   ├── response/               # ApiResponse utility
│   │   ├── swagger/                # Swagger config
│   │   └── helpers.ts              # Misc utilities
│   ├── server.ts                   # Express app setup
│   └── index.ts                    # Entry point
├── eslint.config.mjs               # ESLint v9 flat config
├── jest.config.json                # Jest + ts-jest config
├── tsconfig.json                   # TypeScript config (ES2022, Node16)
└── package.json
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/feature-name`)
3. Commit your Changes (`git commit -m 'Add some feature-name'`)
4. Push to the Branch (`git push origin feature/feature-name`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/arifintahu/project-structure-api.svg?style=for-the-badge
[contributors-url]: https://github.com/arifintahu/project-structure-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/arifintahu/project-structure-api.svg?style=for-the-badge
[forks-url]: https://github.com/arifintahu/project-structure-api/network/members
[stars-shield]: https://img.shields.io/github/stars/arifintahu/project-structure-api.svg?style=for-the-badge
[stars-url]: https://github.com/arifintahu/project-structure-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/arifintahu/project-structure-api.svg?style=for-the-badge
[issues-url]: https://github.com/arifintahu/project-structure-api/issues
