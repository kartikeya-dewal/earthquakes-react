import gql from 'graphql-tag';

export const typeDefs = `

  type Geometry {
    type: String
    coordinates: [Float]
  }

type Properties {
  mag: Float
  place: String
  time: Float,
  tz: Float
  tsunami: Float
  magType: String
  type: String
}

type Earthquake {
  geometry: Geometry
  properties: Properties
  id: ID
}

input QueryInput {
  latitude: Float
  longitude: Float
  minMagnitude: Float
  maxMagnitude: Float
  radius: Float
  fromDate: String
  toDate: String
}

  type Query {
    getEarthquakes(input: QueryInput): [Earthquake]
  }
`;

export const GET_EARTHQUAKES = gql`
  query getEarthquakes(
    $fromDate: String
    $toDate: String
    $minMagnitude: Float
    $maxMagnitude: Float
    $latitude: Float
    $longitude: Float
    $radius: Float
  ) {
    earthquakes(
      fromDate: $fromDate
      toDate: $toDate
      minMagnitude: $minMagnitude
      maxMagnitude: $maxMagnitude
      latitude: $latitude
      longitude: $longitude
      radius: $radius
    ) {
      properties {
        mag
        place
      }
      geometry {
        coordinates
      }
      id
    }
  }
`;
