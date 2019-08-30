import React, { useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { googleApiKey } from '../config';

const mapStyles = {
  width: '90%',
  height: '90%'
};

const MapComponent = ({ google }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});

  const onClose = () => {
    if (showInfoWindow) {
      setShowInfoWindow(false);
      setActiveMarker({});
    }
  };

  return (
    <Map
      google={google}
      zoom={8}
      style={mapStyles}
      initialCenter={{
        lat: -37.8136,
        lng: 144.9631
      }}>
      <Marker
        onClick={(props, marker) => {
          setActiveMarker(marker);
          setShowInfoWindow(true);
        }}
        name={'Melbourne'}
      />

      <InfoWindow
        marker={activeMarker}
        visible={showInfoWindow}
        onClose={() => onClose()}>
        <div>
          <h5>{activeMarker.name}</h5>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: `${googleApiKey}`
})(MapComponent);
