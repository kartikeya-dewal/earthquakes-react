import gql from 'graphql-tag';

export const typeDefs = `

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
`;

export const EARTHQUAKES_QUERY = gql`
{
  earthquakes {
    geometry {
      latitude
      longitude
      depth
    }
    feature {
      place
      mag
    }
    id
  }
}
`;

export const EARTHQUAKES_IN_RADIUS_TIME_QUERY = gql`
{
  earthquakes {
    geometry {
      latitude
      longitude
    }
    feature {
      place
      mag
    }
    id
  }
}
`;