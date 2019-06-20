const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools/dist/makeExecutableSchema');

const typeDefs = `

  type Point {
    latitude: Float
    longitude: Float
    depth: Float
  }

  type Feature {
    mag: Float
    place: String
    time: Float,
    tz: Float
    status: String
    tsunami: Float
    rms: Float
    gap: Float
    magType: String
    type: String
}

type Earthquake {
  geometry: Point
  feature: Feature
  id: ID
}

  type Query {
    earthquakes: [Earthquake]
    earthquakesInRadius(latitude:Float, longitude:Float, radius: Float): [Point]
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;