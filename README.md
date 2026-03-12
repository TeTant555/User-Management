# Node.js Express User Management Template

A production-ready backend template for user management built with Node.js and Express. This project implements a clean, scalable Layered Architecture (Controller-Service-Repository pattern) and includes built-in authentication, robust request validation using Data Transfer Objects (DTOs), and standardized API responses.

## 🌟 Key Features

* **Clean Architecture:** Strict separation of concerns making the codebase scalable and easy to maintain.
* **Authentication:** 
  * Traditional Email/Password Login.
  * Google OAuth2 Login integration.
  * JWT-based authorization.
* **Complete CRUD Operations:** Endpoints for creating, reading, updating, and deleting users.
* **DTO Pattern:** Incoming request validation and formatted outgoing responses to prevent tight coupling with database schemas.
* **Standardized Responses:** Unified structural API success and error handling across all endpoints.
* **Exception Handling:** Global and controller-level try-catch implementations.

---

## 🏗️ Architecture & Project Structure

This project follows a 5-layer architecture design:

1. **Routes:** Defines API endpoints and maps them to controllers.
2. **Controllers:** Handles HTTP requests/responses, validates inputs via DTOs, and calls services.
3. **Services:** Core business logic and orchestration.
4. **Repositories:** Handles data access operations (database queries).
5. **Models:** Database schemas and entities.

```text
📦 server
├── package.json
└── src/
    ├── app.js                 # Express app initialization and middleware setup
    ├── test.js                # Testing module
    ├── config/
    │   └── db.js              # Database connection configuration
    ├── controllers/
    │   └── user.controller.js # Orchestrates HTTP requests and responses
    ├── dtos/
    │   └── userDtos/
    │       ├── user.request.dto.js  # Validates incoming POST/PUT/PATCH bodies
    │       └── user.response.dto.js # Formats outgoing data (strips passwords, etc.)
    ├── models/
    │   └── user.model.js      # Data schema definition
    ├── repositories/
    │   └── user.repository.js # Direct database interaction layer
    ├── routes/
    │   └── user.routes.js     # Express router configurations
    ├── services/
    │   └── user.service.js    # Business logic (e.g., hash generation, auth logic)
    └── utils/
        ├── jwt.util.js        # JWT generation and verification helpers
        └── response.util.js   # unified sendSuccess and sendError wrappers

