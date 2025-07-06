# Get Likes Microservice

## Project Overview

This project is a microservice named `get_likes_service`, built using the **NestJS** framework for Node.js. Its primary function is to retrieve the "likes" associated with a specific publication. The service interacts with a **MongoDB** database to fetch this information.

The project includes CI/CD pipelines (GitHub Actions) for building and publishing Docker images, suggesting it's designed for containerized deployment as part of a larger microservices architecture.

## Folder Structure

The repository is organized as follows:

```
.
├── .github/                      # GitHub specific files
│   └── workflows/                # GitHub Actions CI/CD workflows
│       ├── docker-publish.yml
│       └── docker-publish_qa.yml
├── get_likes_service/            # Root directory for the get_likes_service microservice
│   ├── src/                      # Source code for the NestJS application
│   │   ├── app.controller.spec.ts # Unit tests for the main app controller
│   │   ├── app.controller.ts     # Main NestJS app controller (likely default)
│   │   ├── app.module.ts         # Main NestJS app module
│   │   ├── app.service.ts        # Main NestJS app service (likely default)
│   │   ├── get-likes.controller.ts # Controller for handling 'get-likes' requests
│   │   ├── get-likes.service.ts  # Service containing business logic for fetching likes
│   │   ├── main.ts               # Entry point for the NestJS application
│   │   ├── publication.interface.ts # TypeScript interface for Publication objects
│   │   └── publication.schema.ts # Mongoose schema for the 'Publications' collection
│   ├── test/                     # Test files
│   │   ├── app.e2e-spec.ts       # End-to-end tests
│   │   └── jest-e2e.json         # Jest configuration for e2e tests
│   ├── .gitignore                # Specifies intentionally untracked files for Git
│   ├── .prettierrc               # Configuration for Prettier code formatter
│   ├── README.md                 # This file (documentation for the get_likes_service)
│   ├── dockerfile                # Instructions to build a Docker image
│   ├── eslint.config.mjs         # ESLint configuration
│   ├── nest-cli.json             # NestJS CLI configuration
│   ├── package-lock.json         # Exact versions of project dependencies
│   ├── package.json              # Project metadata, dependencies, and scripts
│   ├── tsconfig.build.json       # TypeScript compiler options for building
│   └── tsconfig.json             # TypeScript compiler options
└── README.md                     # Main repository README (this file)
```

## Backend Design Pattern

The `get_likes_service` utilizes a design pattern closely resembling **Model-View-Controller (MVC)**, which is common in NestJS applications:

*   **Model:** Defined by the `PublicationSchema` (`get_likes_service/src/publication.schema.ts`) and managed by Mongoose. It represents the data structure for publications stored in MongoDB. The `GetLikesService` encapsulates the logic for accessing and retrieving this data.
*   **View:** For this REST API, the "View" is the JSON response sent back to the client. The `GetLikesController` is responsible for formatting this response.
*   **Controller:** Represented by `GetLikesController` (`get_likes_service/src/get-likes.controller.ts`). It handles incoming HTTP requests, delegates business logic to the `GetLikesService`, and sends the appropriate HTTP response.

NestJS's architecture emphasizes modularity and a clear separation of concerns, with controllers for request handling and services for business logic.

## Communication Architecture

The primary communication architecture for this service is **synchronous HTTP requests and responses**:

1.  A client (e.g., frontend, another microservice) sends an HTTP request to the service's defined endpoint.
2.  The `GetLikesController` in NestJS receives the request.
3.  The controller calls methods in the `GetLikesService` to process the request and interact with the database.
4.  The `GetLikesService` uses Mongoose to query the MongoDB database. While database operations are asynchronous within the Node.js event loop, the interaction pattern with the database is request-response.
5.  The service returns data (or errors) to the controller.
6.  The controller formats a JSON response and sends it back to the client with an appropriate HTTP status code.

There is no evidence of asynchronous messaging systems (like Kafka, RabbitMQ) being used directly by this service for its core API functionality.

## Folder Pattern (within `get_likes_service/`)

The `get_likes_service/` directory follows a conventional NestJS project structure:

*   **`src/`**: This is the heart of the application, containing all TypeScript source code.
    *   `main.ts`: Bootstraps and starts the NestJS application.
    *   `*.module.ts`: (e.g., `app.module.ts`) Define NestJS modules to organize the application. The root module is `app.module.ts`.
    *   `*.controller.ts`: (e.g., `get-likes.controller.ts`) Handle incoming HTTP requests and route them.
    *   `*.service.ts`: (e.g., `get-likes.service.ts`) Contain the core business logic.
    *   `*.schema.ts`: (e.g., `publication.schema.ts`) Define Mongoose schemas for database models.
    *   `*.interface.ts`: (e.g., `publication.interface.ts`) Define TypeScript interfaces for data shapes.
*   **`test/`**: Contains automated tests.
    *   `*.e2e-spec.ts`: End-to-end tests that verify the behavior of the API endpoints.
*   **Root-level configuration files**:
    *   `dockerfile`: For building Docker images.
    *   `package.json`, `package-lock.json`: For Node.js dependency management and project scripts.
    *   `tsconfig.json`, `tsconfig.build.json`: For TypeScript compilation settings.
    *   `.eslintrc.js`, `.prettierrc`: For code linting and formatting.
    *   `nest-cli.json`: For NestJS specific project configurations.

## API Endpoint Instructions

### Get Likes for a Publication

*   **Description:** Retrieves the list of user identifiers who have "liked" a specific publication and the total count of these likes.
*   **HTTP Method:** `POST`
*   **Path:** `/get-likes`
*   **Request Body:**
    *   Content-Type: `application/json`
    *   Payload:
        ```json
        {
          "id": "string" // The ID of the publication
        }
        ```
    *   **`id`** (string, required): The unique identifier of the publication.

*   **Success Response (Status Code `200 OK`):**
    *   Content-Type: `application/json`
    *   Payload:
        ```json
        {
          "likes": ["string"], // Array of user IDs or identifiers who liked the publication.
          "count": "number"    // The total number of likes.
        }
        ```
    *   **Example (Publication with likes):**
        ```json
        {
          "likes": ["user_alpha_123", "user_beta_456"],
          "count": 2
        }
        ```
    *   **Example (Publication with no likes):**
        ```json
        {
          "likes": [],
          "count": 0
        }
        ```

*   **Error Responses:**
    *   **Status Code `404 Not Found`:** Returned if the publication with the specified `id` is not found.
        *   Payload:
            ```json
            {
              "statusCode": 404,
              "message": "Publication not found",
              "error": "Not Found"
            }
            ```
    *   Other standard HTTP error codes (e.g., `400 Bad Request` for invalid input) may also be returned by the framework.
