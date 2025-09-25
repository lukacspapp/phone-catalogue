# Phone Catalogue

## How to Run the Application

### Option 1: Docker

```bash
# Clone the repository

git clone <your-repo-url>
cd phone-catalogue

# Start both backend and frontend

docker compose up

# Access the application:
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
```

### Option 2: Manual Setup

#### Backend API

```bash
cd backend
npm install
npm run dev

# API will run on http://localhost:3001
```

#### Frontend

```bash
cd frontend
npm install
npm run dev

# Frontend will run on http://localhost:3000
```


## How to Run the Tests

### Backend Tests

```bash
cd backend
npm run test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## API Endpoints
- `GET /phones`: Retrieve a list of phones with optional filtering, sorting, and pagination.
- `GET /phones/:id`: Retrieve details of a specific phone by ID.
- `GET /health`: Check the health status of the API.

#### Query Parameters for `GET /phones`

- `brand`: Filter by brand (e.g., `Apple`, `Samsung`).
-  `page`: Page number for pagination (default: 1).
- `limit`: Number of items per page (default: 10).
- `sortBy`: Field to sort by (e.g., `price`, `name`, `price`).
- `sortOrder`: Sort order (`asc` or `desc`, default: `asc`).
- `priceMin`: Minimum price filter.
- `priceMax`: Maximum price filter.

#### Example Request
```
http://localhost:3001/api/phones?brand=Apple&sortBy=price&sortOrder=desc&page=1&limit=10
```