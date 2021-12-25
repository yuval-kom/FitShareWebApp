import React from 'react';
import GoogleMapReact from 'google-map-react';

const MapContainer = ({ latitude, longitude }) => {
 const renderMarkers = (map, maps) => {
  let marker = new maps.Marker({
  position: { lat: latitude, lng: longitude },
  map,
  title: 'Hello World!'
  });
  return marker;
 };

 return (
   <div style={{ height: '50vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyC-6vvFnV4-d5ZAeyfVvmfPALhZyc6c5Hg' }}
      defaultCenter={{ lat: latitude, lng: longitude }}
      defaultZoom={16}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
    >
    </GoogleMapReact>
   </div>
 );
};

export default MapContainer;

//export default MapContainer;

//   AIzaSyC-6vvFnV4-d5ZAeyfVvmfPALhZyc6c5Hg

