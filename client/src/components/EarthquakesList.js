import React from 'react';
import { GET_EARTHQUAKES } from '../schema';
import { useQuery } from '@apollo/react-hooks';
import { onError } from 'apollo-link-error';
import event from './utils/Event';

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
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

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
  if (earthquakes && earthquakes.length > 0) {
    event.emit('earthquakes', earthquakes);
    return earthquakes.map(quake => (
      <li key={quake.id}>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{quake.properties.place}</h5>
            <p className='card-text'>Magnitude {quake.properties.mag}</p>
          </div>
        </div>
      </li>
    ));
  } else {
    return <p>No records founds</p>;
  }
};

export default EarthquakesList;
