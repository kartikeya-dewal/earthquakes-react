import React, { useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { googleApiKey } from '../config';
import event from './utils/Event';

const mapStyles = {
  width: '75vw',
  height: '100vh'
};

const MapComponent = ({ google }) => {
  const [initialCenter] = useState({
    lat: -37.8136,
    lng: 144.9631,
    name: 'Melbourne'
  });
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
        lat: initialCenter.lat,
        lng: initialCenter.lng
      }}
      center={{
        lat: location.latitude,
        lng: location.longitude
      }}>
      <Marker
        position={{
          lat: location.latitude || initialCenter.lat,
          lng: location.longitude || initialCenter.lng
        }}
        title={location.name}
        name={location.name || initialCenter.name}
        onClick={(props, marker) => {
          setActiveMarker(marker);
          setShowInfoWindow(true);
        }}
      />
      {earthquakes.length > 0 &&
        earthquakes.map((quake, i) => (
          <Marker
            key={i}
            position={{
              lat: quake.geometry.coordinates[1],
              lng: quake.geometry.coordinates[0]
            }}
            title={quake.properties.place}
            name={quake.properties.place}
            label={{
              text: `${quake.properties.mag}`,
              color: 'yellow',
              fontWeight: 'bold'
            }}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/micons/earthquake.png'
            }}
            onClick={(props, marker) => {
              setActiveMarker(marker);
              setShowInfoWindow(true);
            }}
          />
        ))}
      <InfoWindow
        marker={activeMarker}
        visible={showInfoWindow}
        onClose={() => onClose()}>
        <div>
          <strong>{activeMarker.name}</strong>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: `${googleApiKey}`
})(MapComponent);
