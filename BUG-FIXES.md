# Hardened: 10 Critical Bugs Found and Fixed in project-structure-api

A comprehensive security and reliability audit of [project-structure-api](https://github.com/arifintahu/project-structure-api) — an Express.js + TypeScript + Sequelize REST API. Every fix was double-verified with real use-case reasoning and confidence scores before being applied. Build clean, all 30 tests passing.

---

## What was wrong → What was fixed

### 1. Crash on every authenticated request — unhandled promise rejection in middleware

The `authenticate` middleware was an `async` function without a `try/catch`. In Express 4.x, rejected promises from async middleware silently crash the process. Any JWT validation failure or malformed token would bring down the entire server with an `UnhandledPromiseRejection`.

→ Wrapped the entire middleware body in a `try/catch` block that forwards errors to `next()`.

---

### 2. Hashed passwords leaked in API responses

`UserService.createUser` returned the full `UserOutput` object — including the `password` field with the bcrypt hash. Any client hitting `POST /v1/users` received the password hash in the JSON response body.

→ Introduced a `PublicUserOutput` type (`Omit<UserOutput, 'password'>`) and updated the service and interface to return only safe fields. Updated test mocks to match.

---

### 3. JWT `iat` was in milliseconds instead of seconds

`signToken` set `iat: Date.now()` — a 13-digit millisecond timestamp. The JWT spec defines `iat` in **seconds** since epoch. This caused token lifetime calculations to be off by 1000x, breaking expiration logic and any token-age-based security checks.

→ Changed to `Math.floor(Date.now() / 1000)`.

---

### 4. FK race condition in DB sync crashed startup

`sync-db` used `Promise.all([Role.sync(), User.sync()])` — running both table syncs in parallel. Since `User` has a foreign key to `Role`, Sequelize would try to create the FK constraint before the `Role` table existed, causing a `SequelizeDatabaseError` on cold starts.

→ Changed to sequential `await Role.sync()` then `await User.sync()`.

---

### 5. Promise double-settle in `signToken` and `verifyToken`

Both functions called `reject(err)` and then continued execution, eventually also calling `resolve(token)`. While the `return` keyword wasn't present, this meant the promise was settled twice — unpredictable behavior across different JS runtimes.

→ Added `return` after every `reject()` call so the function exits immediately on error.

---

### 6. Hardcoded JWT secret in source code

`appConfig.ts` contained `j!89nKO5as&Js` as a fallback `secret` value. This committed a real authentication secret to version control — a critical security vulnerability that allows token forgery by anyone with repo access.

→ Removed the hardcoded fallback entirely. Added `SECRET` to the required environment variables list so the app refuses to start without it. Updated `.env.example` with a placeholder.

---

### 7. Morgan dev-mode check used wrong env var

Morgan's skip logic checked `process.env.SERVER === 'development'`, but the rest of the app uses `process.env.NODE_ENV`. In production, `SERVER` is undefined, so Morgan would **always** skip logging instead of only in dev.

→ Replaced with `AppConfig.app.isDevelopment` which correctly reads `NODE_ENV`.

---

### 8. Rate limiter killed CORS preflight requests

CORS middleware was registered **after** the rate limiter. Browsers send `OPTIONS` preflight requests before every cross-origin `POST/PUT/DELETE`. The rate limiter intercepted and counted these, exhausting the limit before the actual request even arrived.

→ Moved `app.use(cors(...))` **before** `app.use(rateLimit(...))` so preflight requests are handled before rate limiting applies.

---

### 9. Missing `logs/` directory crashed logger in non-Docker environments

Winston's logger wrote to `logs/error.log` and `logs/combined.log`. The directory was only created inside the Docker container. Running locally on bare metal or in CI/CD pipelines threw `ENOENT: no such file or directory`.

→ Added a `prepare-logs` npm script (`mkdir -p logs`) and wired it into `start` and `start-watch` scripts.

---

### 10. Error handler logged plaintext passwords and tokens

The global error handler logged `req.body` for debugging — including `password`, `token`, `authorization`, and `secret` fields in plaintext. Any error in production would dump credentials into log files.

→ Added a `sanitizeBody()` function that redacts sensitive fields before logging, replacing values with `***REDACTED***`.

---

## Verification

| Command         | Result        |
| --------------- | ------------- |
| `npm run build` | Clean         |
| `npm test`      | 30/30 passing |
| `npm run lint`  | Zero errors   |

---

## Repository

**Fixed version:** [github.com/Mayne-X/project-structure-api-fixed](https://github.com/Mayne-X/project-structure-api-fixed)
**Original:** [github.com/arifintahu/project-structure-api](https://github.com/arifintahu/project-structure-api)
