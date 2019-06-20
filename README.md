# Earthquakes Demo

This is an Express Graphql application that presents earthquakes data on a map with filters such as magnitude, radius, date range etc.

## Getting Started

### Server
```bash
npm install
npm start
```
The server runs on port 4000.
GraphiQL route:
- http://localhost:4000/graphql

Schema is defined in the file `data/schema.js`.
Resolvers are define in the file `data/resolvers.js`.

### Client
Built using `create-react-app`.

```bash
cd client
npm install
npm start
```
The client runs on port 3000 and proxies to server on port 4000.

## Development

This project uses ESLint to detect suspicious code in JavaScript files.
Visit http://eslint.org for details.