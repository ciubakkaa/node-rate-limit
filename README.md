# Rate Limiting API

This is a Node.js and Express API that demonstrates rate limiting with two different algorithms: Token Bucket and Fixed Window.

## Features

- Two GET endpoints: `/foo` (Token Bucket) and `/bar` (Fixed Window)
- Authentication using a `Bearer` token with a client ID
- Per-client rate limiting
- Switchable storage strategies: in-memory and PostgreSQL
- Deployed on Render

## Getting Started

### Prerequisites

- Node.js
- A Render account
- A Render PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rate-limiting-api.git
   ```
2. Install the dependencies:
   ```bash
   yarn
   ```

### Running Locally

1. Create a `.env` file in the root of the project and add the following environment variables:
   ```
   PORT=3003
   DATABASE_URL=your-postgresql-connection-string
   ```
2. Start the server:
   ```bash
   yarn start
   ```

### Example `curl` Commands

#### `/foo` (Token Bucket)

```bash
curl -X GET http://localhost:3000/foo -H "Authorization: Bearer client-1"
```

#### `/bar` (Fixed Window)

```bash
curl -X GET http://localhost:3000/bar -H "Authorization: Bearer client-1"
```

### Deployment to Render

1. Create a new Web Service on Render and connect it to your GitHub repository.
2. Set the build command to `npm install` and the start command to `npm start`.
3. Add the following environment variables in the Render dashboard:
   - `DATABASE_URL`: your Render PostgreSQL connection string

## Testing

To run the tests, use the following command:

```bash
yarn test
```

### For trying the endpoints
You can use in Authorization headers "Bearer client-1" or "Bearer client-1"

You can try out the remote urls here: https://node-rate-limit.onrender.com (with /foo or /bar)
