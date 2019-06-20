const geoData = require('./earthquakes.json');

const resolvers = {
  Query: {
    // get all geo locations of earthquakes
    earthquakes: () => {
      const earthquakes = [];
      const quakes = geoData.features;
      quakes.map((earthquake) => {
        const point = earthquake.geometry.coordinates.toString().split(',');
        earthquakes.push({
          'geometry': { latitude: point[0], longitude: point[1], depth: point[2] },
          'feature': earthquake.properties,
          'id': earthquake.id
        });
      });
      return earthquakes;
    },
    // find earthquakes within a radius around a geo point
    earthquakesInRadius: (root, { latitude, longitude, radius }) => {
      const qaukesFound = [];
      const earthquakes = geoData.features;
      earthquakes.map((earthquake) => {
        const point = earthquake.geometry.coordinates.toString().split(',');
        const distance = calculateGeoDistance(latitude, longitude, point[0], point[1]);
        if (distance <= radius) {
          qaukesFound.push({ latitude: point[0], longitude: point[1], depth: point[2] })
        }
      });
      return qaukesFound;
    }
  }
}

/**
 * Calculates geo-distance between two coordinates
 * @param {Number} lat1 latitude of point 1
 * @param {Number} lon1 longitude of point 1
 * @param {Number} lat2 latitude of point 2
 * @param {Number} lon2 longitude of point 2
 * @return {Number} distance between two geo points in kms
 */
function calculateGeoDistance(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }
}

module.exports = resolvers;