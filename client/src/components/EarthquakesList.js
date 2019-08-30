import React from 'react';
import { GET_EARTHQUAKES } from '../schema';
import { useQuery } from '@apollo/react-hooks';

const EarthquakesList = ({
  props: {
    location: { latitude, longitude },
    fromDate,
    toDate,
    minMagnitude,
    maxMagnitude,
    radius
  }
}) => {
  const {
    loading,
    error,
    data: { earthquakes }
  } = useQuery(GET_EARTHQUAKES, {
    variables: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      fromDate,
      toDate,
      minMagnitude: parseFloat(minMagnitude),
      maxMagnitude: parseFloat(maxMagnitude),
      radius: parseFloat(radius)
    }
  });
  if (loading) return 'Loading...';
  if (error) return <p>{error.message}</p>;
  console.log(`Data: ${JSON.stringify(earthquakes)}`);
  if (earthquakes && earthquakes.length > 0) {
    return earthquakes.map(quake => (
      <p key={quake.id}>{quake.properties.place}</p>
    ));
  } else {
    return <p>No records founds</p>;
  }
};

export default EarthquakesList;
