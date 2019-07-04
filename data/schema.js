const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools/dist/makeExecutableSchema');

const typeDefs = `

  type Point {
    latitude: Float
    longitude: Float
    depth: Float
    fromDate: Float
    toDate: Float
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

input PointInput {
  latitude: Float
  longitude: Float
  depth: Float
  radius: Float
  fromDate: Float
  toDate: Float
}

  type Query {
    earthquakes: [Earthquake]
    getEarthquakesInRadius(latitude:Float, longitude:Float, radius: Float): [Point]
    getEarthquakesInRadiusTimespan(input: PointInput): [Earthquake]
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;