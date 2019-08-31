import React, { Fragment, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { googleApiKey } from '../config';
import event from './utils/Event';

const mapStyles = {
  width: '75vw',
  height: '100vh'
};

const MapComponent = ({ google }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [location, setLocation] = useState({});
  const [earthquakes, setEarthquakes] = useState([]);

  const onClose = () => {
    if (showInfoWindow) {
      setShowInfoWindow(false);
      setActiveMarker({});
    }
  };

  event.on('earthquakes', earthquakes => {
    setEarthquakes(earthquakes);
  });

  event.on('placeSelected', location => {
    setLocation(location);
  });

  return (
    <Map
      google={google}
      zoom={6}
      style={mapStyles}
      initialCenter={{
        lat: -37.8136,
        lng: 144.9631
      }}
      center={{
        lat: location.latitude,
        lng: location.longitude
      }}>
      <Marker
        onClick={(props, marker) => {
          setActiveMarker(marker);
          setShowInfoWindow(true);
        }}
        name={location.name}
        position={{
          lat: location.latitude,
          lng: location.longitude
        }}
      />
      <InfoWindow
        marker={activeMarker}
        visible={showInfoWindow}
        onClose={() => onClose()}>
        <div>
          <h5>{activeMarker.name}</h5>
        </div>
      </InfoWindow>
      {earthquakes.length > 0 &&
        earthquakes.map(quake => (
          <Fragment key={quake.id}>
            <Marker
              // key={`${quake.id}`}
              position={{
                lat: quake.geometry.coordinates[0],
                lng: quake.geometry.coordinates[1]
              }}
              name={quake.properties.place}
            />
          </Fragment>
        ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: `${googleApiKey}`
})(MapComponent);
