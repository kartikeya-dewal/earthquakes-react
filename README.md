# Earthquakes Demo

This is an Express GraphQL application that presents earthquakes data on a map around a geolocation with filters such as magnitude, radius, date range etc.<br/>
The earthquake data is pulled from U.S. Geological Survey API:<br/>

- https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=\<YYY-MM-DD\>&endtime=\<YYY-MM-DD\>.<br/>

Visit USGS API documentation https://earthquake.usgs.gov/fdsnws/event/1/ for parameters and other details.

## Getting Started

Clone the `develop` branch

### Server

```bash
npm install
npm start
```

The server runs on port 4000.
GraphiQL route:

- http://localhost:4000/graphql

Resolvers and Schema are defined in the file `data/schema.js`.

### Client

Built using `create-react-app`.

```bash
cd client
npm install
npm start
```

The client runs on port 3000 and proxies to server on port 4000.<br/>
[Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial "Google's Homepage") key is required to serve the client.

## Development

This project uses ESLint to detect suspicious code in JavaScript files.
Visit http://eslint.org for details.
