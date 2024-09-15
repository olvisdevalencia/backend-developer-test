
---

# Backend Developer Test 🚀

This is a test project for a **JavaScript Back End Developer Test** using **NestJS** as the main framework. The project is set up to perform CRUD operations on products, generate reports, and manage authentication using JWT.

## Key Features

- **NestJS** with a modular architecture.
- **TypeORM** for database management with **PostgreSQL**.
- **JWT** (JSON Web Tokens) for authentication.
- **Swagger** for API documentation.
- **Code coverage** with **Jest** and **E2E testing**.

## Prerequisites

Make sure you have the following installed before running the project:

- **Node.js** (version 16 or higher)
- **PostgreSQL** (or use the provided Docker container)
- **Docker** (optional, to run the database in a container)

### Installing **pnpm**

This project uses **pnpm** as the package manager. If you don't have **pnpm** installed, you can install it globally using **npm** or **yarn**:

- Using **npm**:

  ```bash
  npm install -g pnpm
  ```

- Using **yarn**:

  ```bash
  yarn global add pnpm
  ```

You can confirm **pnpm** is installed correctly by running:

```bash
pnpm --version
```

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/olvisdevalencia/backend-developer-test.git
cd backend-developer-test
```

Install dependencies using **pnpm**:

```bash
pnpm install
```

## Environment Configuration

You need to create a **`.env`** file in the root of the project with the following configuration:

```env
# JWT
JWT_SECRET=apply_digital_javascript_back_end_developer_test
JWT_EXPIRES_IN=3600  # 1 hour

# Contentful
CONTENTFUL_SPACE_ID=9xs1613l9f7v
CONTENTFUL_ACCESS_TOKEN=I-ThsT55eE_B3sCUWEQyDT4VqVO3x__20ufuie9usns
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_CONTENT_TYPE=product

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
DB_SYNC=true
```

If you want to use Docker for the database, you can easily set up a PostgreSQL container using the following command:

```bash
docker-compose up -d
```

This will start a PostgreSQL container and connect the application to it.

## Running the Application

Once the environment is set up, you can run the project in development mode:

```bash
pnpm start:dev
```

This will start the server at **`http://localhost:3000`**.

### API Documentation (Swagger)

The API documentation is available via **Swagger** at the following routes:

- [Swagger YAML Documentation](http://localhost:3000/api/docs-yaml) - For viewing the documentation in **YAML** format.
- [Swagger UI Documentation](http://localhost:3000/api/docs) - For the **Swagger UI**, which provides an interactive interface to explore and test API endpoints.

Access these routes to explore and test the API endpoints.

## Testing

The project includes both unit tests and **end-to-end (E2E)** tests using **Jest**. You can run the tests using the following commands:

### Unit Tests

```bash
pnpm run test
```

### E2E Tests

```bash
pnpm run test:e2e
```

### Code Coverage

To generate a code coverage report, use:

```bash
pnpm run coverage
```

The coverage report will be generated in the **`coverage/`** folder, and you can open the **`index.html`** file to see a visual report.

## Building for Production

To build the project for production, run:

```bash
pnpm run build
```

This will generate the files in the **`dist/`** folder, and you can run the application in production mode with:

```bash
pnpm run start:prod
```

## Docker

You can run the entire environment (database and application) using **Docker**. Make sure you have **Docker** installed and run the following commands:

### Start the Database with Docker Compose:

```bash
docker-compose up -d
```

### Build the Docker image and run the application:

```bash
docker build -t backend-developer-test .
docker run -p 3000:3000 --env-file .env backend-developer-test
```

## Contact

- Author: **Olvis Quintana**
- LinkedIn: [linkedin.com/in/olvisquintana](https://www.linkedin.com/in/olvisquintana/)
- Email: quintanaolvis@gmail.com

---