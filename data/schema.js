const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema
} = require('graphql');
const axios = require('axios');
const moment = require('moment');

const Geometry = new GraphQLObjectType({
  name: 'Geometry',
  fields: () => ({
    coordinates: { type: GraphQLList(GraphQLFloat) }
  })
});

const Properties = new GraphQLObjectType({
  name: 'Properties',
  fields: () => ({
    mag: { type: GraphQLFloat },
    place: { type: GraphQLString },
    time: { type: GraphQLInt },
    tz: { type: GraphQLInt },
    tsunami: { type: GraphQLInt }
  })
});

const Earthquake = new GraphQLObjectType({
  name: 'Earthquake',
  fields: () => ({
    id: { type: GraphQLID },
    geometry: { type: Geometry },
    properties: { type: Properties }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    earthquakes: {
      type: GraphQLList(Earthquake),
      args: {
        fromDate: { type: GraphQLString },
        toDate: { type: GraphQLString },
        minMagnitude: { type: GraphQLFloat },
        maxMagnitude: { type: GraphQLFloat },
        latitude: { type: GraphQLFloat },
        longitude: { type: GraphQLFloat },
        radius: { type: GraphQLFloat }
      },
      resolve(parent, args) {
        args.fromDate = moment(args.fromDate).format('YYYY-MM-DD');
        args.toDate = moment(args.toDate).format('YYYY-MM-DD');
        console.log(
          `${args.fromDate} ${args.toDate} ${args.minMagnitude} ${args.maxMagnitude} ${args.latitude} ${args.longitude} ${args.radius}`
        );
        const uri = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${args.fromDate}&endtime=${args.toDate}&minmagnitude=${args.minMagnitude}&maxmagnitude=${args.maxMagnitude}&latitude=${args.latitude}&longitude=${args.longitude}&maxradiuskm=${args.radius}`;
        return axios.get(uri).then(res => res.data.features);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
