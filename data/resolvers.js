const axios = require('axios');
const moment = require('moment');

const resolvers = {
  Query: {
    getEarthquakes: async (
      root,
      {
        input: {
          fromDate,
          toDate,
          minMagnitude,
          maxMagnitude,
          latitude,
          longitude,
          radius
        }
      }
    ) => {
      console.log(
        `${fromDate},${toDate},${minMagnitude},${maxMagnitude},${latitude},${longitude},${radius}`
      );
      fromDate = moment(fromDate).format('YYYY-MM-DD');
      toDate = moment(toDate).format('YYYY-MM-DD');
      const res = await axios.get(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${fromDate}&endtime=${toDate}&minmagnitude=${minMagnitude}&maxmagnitude=${maxMagnitude}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radius}`
      );
      return res.data.features;
    }
  }
};

module.exports = resolvers;
