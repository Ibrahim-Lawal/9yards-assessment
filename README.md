# Setup

## Prerequisites

- Node.js v16 or higher
- MongoDB running locally

## Server

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

The API will start on http://localhost:3000.

## Client

Open a second terminal tab:

```bash
cd client
npm install
cp .env.example .env
npm run serve
```

The app will be available at http://localhost:8080.
