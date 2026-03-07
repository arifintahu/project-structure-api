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
    <li><a href="#docker">Docker</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api-reference">API Reference</a></li>
    <li><a href="#openapi-spec">OpenAPI Spec</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

## About The Project

A clean, scalable Node.js API boilerplate with proper separation of concerns. Built with modern tooling (Node 22+, TypeScript 5.7, ESLint 9) and production-grade features including security hardening, structured logging, health checks, graceful shutdown, and CI/CD.

### Built With

| Category      | Technology                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Runtime**   | [Node.js](https://nodejs.org/) v22+                                                                                                  |
| **Language**  | [TypeScript](https://www.typescriptlang.org/) 5.7                                                                                    |
| **Framework** | [Express.js](https://expressjs.com/) 4.x                                                                                             |
| **ORM**       | [Sequelize](https://sequelize.org/) 6.x                                                                                              |
| **Database**  | [PostgreSQL](https://www.postgresql.org/)                                                                                            |
| **Auth**      | [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) + [bcrypt](https://www.npmjs.com/package/bcrypt)                        |
| **Security**  | [Helmet](https://helmetjs.github.io/) + [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)                       |
| **Docs**      | [Swagger](https://swagger.io/) (swagger-jsdoc + swagger-ui-express)                                                                  |
| **Testing**   | [Jest](https://jestjs.io/) + [ts-jest](https://kulshekhar.github.io/ts-jest/) + [Supertest](https://www.npmjs.com/package/supertest) |
| **Linting**   | [ESLint](https://eslint.org/) 9 (flat config) + [Prettier](https://prettier.io/)                                                     |
| **CI/CD**     | [GitHub Actions](https://github.com/features/actions)                                                                                |
| **Container** | [Docker](https://www.docker.com/) + Docker Compose                                                                                   |

### Features

- **Layered architecture** — Routes → Controllers → Services → Repositories → Models
- **Security hardening** — Helmet headers, rate limiting, body size limits, env-based CORS
- **Request tracing** — `X-Request-Id` UUID per request, included in logs and response headers
- **Structured logging** — JSON format in production (for log aggregation), colorized in development
- **Health check** — `GET /health` with database connectivity status
- **Graceful shutdown** — Handles `SIGTERM`/`SIGINT`, drains connections, closes DB pool
- **DB connection pooling** — Configurable Sequelize pool (min/max/acquire/idle)
- **Typed error handling** — Custom `AppError` hierarchy with proper HTTP status codes
- **Consistent API responses** — `ApiResponse` utility for uniform success/error/paginated responses
- **Pagination** — Built-in paginated list endpoints with `?page=1&limit=10`
- **Password hashing** — Automatic bcrypt hashing via Sequelize model hooks
- **Environment validation** — Required env vars checked at startup with clear errors
- **JWT authentication** — Token-based auth with role-based access control
- **OpenAPI 3.0** — Inline JSDoc specs co-located with routes + JSON spec export
- **Docker** — Multi-stage build, non-root user, health check, Compose with PostgreSQL
- **CI/CD** — GitHub Actions pipeline (lint → build → test)
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
| **Middlewares**  | Auth, validation, rate limiting, request ID    | `Auth.authenticate`, `Validate(...)` |
| **Controllers**  | Parse request, call service, send response     | `UserController.createUser`          |
| **Services**     | Business logic, validation rules               | `UserService.createUser`             |
| **Repositories** | Database queries via Sequelize                 | `UserRepository.getUsers`            |
| **Models**       | Schema definition, hooks, associations         | `User`, `Role`                       |

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

- **Node.js** v22 or higher
- **PostgreSQL** server running (or use Docker)
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

    Edit `.env` with your settings:

    ```env
    NODE_ENV=development
    APP_NAME=my-project
    SERVER=development
    PORT=3001
    SECRET=your-secret-key
    API_VERSION=v1

    # CORS
    CORS_ORIGIN=*

    # Rate Limiting
    RATE_LIMIT_WINDOW_MS=900000
    RATE_LIMIT_MAX=100

    # Database
    DB_HOST=localhost
    DB_DATABASE=mydb
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_PORT=5432
    DB_DIALECT=postgres
    DB_TIMEZONE=Asia/Jakarta
    DB_LOG=true

    # Database Connection Pool
    DB_POOL_MIN=2
    DB_POOL_MAX=10
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

7. **Verify**
    - Health check: [http://localhost:3001/health](http://localhost:3001/health)
    - Swagger docs: [http://localhost:3001/docs/v1](http://localhost:3001/docs/v1)
    - OpenAPI spec: [http://localhost:3001/docs/v1/spec.json](http://localhost:3001/docs/v1/spec.json)

<p align="right">(<a href="#top">back to top</a>)</p>

## Docker

Run the entire stack (API + PostgreSQL) with Docker Compose:

```sh
# Start services
docker compose up --build

# Start in background
docker compose up --build -d

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v
```

The Compose file includes:

- **app** — Node API built with multi-stage Dockerfile (non-root user, health check)
- **db** — PostgreSQL 16 Alpine with persistent volume and health check

Environment variables can be overridden via `.env` file or inline:

```sh
DB_PASSWORD=mysecret PORT=8080 docker compose up --build
```

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
8. **Routes** — Create `src/api/routes/v1/products.ts` with inline `@swagger` JSDoc, register in `src/api/routes/v1/index.ts`
9. **Tests** — Add `__test__/` folders in repositories and services

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

### Health

| Method | Endpoint  | Description                 | Auth |
| ------ | --------- | --------------------------- | ---- |
| `GET`  | `/health` | Health check with DB status | No   |

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

## OpenAPI Spec

API documentation uses **OpenAPI 3.0** with inline `@swagger` JSDoc annotations co-located with route definitions. This means the spec stays in sync with the code automatically.

### Swagger UI

Available in development at `/docs/v1`:

```
http://localhost:3001/docs/v1
```

### JSON Spec Export

Get the raw OpenAPI JSON spec (useful for client SDK generation):

```
GET http://localhost:3001/docs/v1/spec.json
```

Use this with tools like:

- [openapi-generator](https://openapi-generator.tech/) — Generate client SDKs in any language
- [Postman](https://www.postman.com/) — Import collection from OpenAPI spec
- [Redoc](https://redocly.com/) — Alternative API docs renderer

### Adding Docs to a New Route

Add `@swagger` JSDoc comments directly above route definitions:

```typescript
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products
 *     description: Get paginated list of products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */
productsRouter.route('/').get(Auth.authenticate, ProductController.getProducts);
```

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

### Test Types

| Type            | Location                 | Description                                |
| --------------- | ------------------------ | ------------------------------------------ |
| **Unit**        | `services/__test__/`     | Service business logic (mocked repos)      |
| **Unit**        | `repositories/__test__/` | Repository data access (mocked models)     |
| **Integration** | `routes/__test__/`       | Full HTTP request → response via supertest |

Integration tests verify health check, request ID, security headers, authentication enforcement, and input validation.

<p align="right">(<a href="#top">back to top</a>)</p>

## Project Structure

```
├── .github/workflows/ci.yml       # GitHub Actions CI pipeline
├── .husky/                         # Git hooks (pre-commit: lint-staged)
├── src/
│   ├── @types/                     # Custom type declarations
│   ├── api/
│   │   ├── controllers/            # Request handling, response formatting
│   │   ├── middlewares/
│   │   │   ├── auth/               # JWT authentication & role checking
│   │   │   ├── handlers/           # Global error handler
│   │   │   ├── morgan/             # HTTP request logging (with request ID)
│   │   │   ├── requestId/          # X-Request-Id generation
│   │   │   └── validator/          # Input validation (express-validator)
│   │   ├── models/                 # Sequelize models & type definitions
│   │   ├── repositories/
│   │   │   ├── interfaces/         # Repository contracts
│   │   │   ├── __test__/           # Repository unit tests
│   │   │   └── *.ts                # Data access layer
│   │   ├── routes/
│   │   │   ├── v1/                 # Route definitions with inline @swagger docs
│   │   │   └── __test__/           # Integration tests (supertest)
│   │   ├── services/
│   │   │   ├── interfaces/         # Service contracts
│   │   │   ├── __test__/           # Service unit tests
│   │   │   └── *.ts                # Business logic layer
│   │   └── types/                  # Request DTOs & pagination types
│   ├── config/
│   │   ├── appConfig.ts            # Centralized configuration (CORS, rate limit, DB pool)
│   │   └── validateEnv.ts          # Startup environment validation
│   ├── constants/                  # App-wide constants
│   ├── database/                   # DB connection (with pool config) & table sync
│   ├── errors/
│   │   └── AppError.ts             # Typed error class hierarchy
│   ├── utils/
│   │   ├── jwt/                    # JWT sign/verify helpers
│   │   ├── logger/                 # Winston logger (JSON prod / colorized dev)
│   │   ├── response/               # ApiResponse utility
│   │   ├── swagger/                # OpenAPI config (scans route files)
│   │   └── helpers.ts              # Misc utilities
│   ├── server.ts                   # Express app (helmet, rate limit, CORS, health check)
│   └── index.ts                    # Entry point (graceful shutdown)
├── Dockerfile                      # Multi-stage build, non-root user
├── docker-compose.yml              # App + PostgreSQL 16
├── .dockerignore
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
