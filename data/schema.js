const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools/dist/makeExecutableSchema');

const typeDefs = `

  type Point {
    latitude: Float
    longitude: Float
    depth: Float
  }

  type Query {
    getLocations: [Point]
    earthquakesInRadius(latitude:Float, longitude:Float, radius: Float): [Point]
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;