import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 48.8566,  // Coordonnées pour Paris (par exemple)
    longitude: 2.3522,
    zoom: 10
  });

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Map
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="pk.eyJ1IjoiYmV0YWNhcmRyaXZlIiwiYSI6ImNtMjB3OThpZDBrZXcyanNjdzJkYjBhd3kifQ.1Dg9uR6pAwpnuXr5X2P82A"
      >
        {/* Exemple de marker */}
        <Marker latitude={48.8566} longitude={2.3522}>
          <div style={{ color: 'red' }}>📍</div>
        </Marker>
      </Map>
    </div>
  );
};

export default MapComponent;
