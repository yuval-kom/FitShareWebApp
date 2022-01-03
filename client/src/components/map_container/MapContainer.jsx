import { useEffect, useState , useRef} from "react";
import ReactMapGL, {Marker, Popup, } from 'react-map-gl';
import axios from 'axios';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Geocoder from 'react-mapbox-gl-geocoder';


mapboxgl.accessToken = 'pk.eyJ1IjoieWVzdW1pbSIsImEiOiJja3h0OGlzOHcxMGR5MnNtcDRwYmxvcmViIn0.QMw9KnE29uVzWjKSSG2WLw';


function MapContainer() {
  
  const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);



useEffect(() => {
  if (map.current) return; // initialize map only once
  map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [lng, lat],
  zoom: zoom
  });
  });



 /*    const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false // Do not use the default marker style
  });  */
  
  // Add the geocoder to the map
  //map.addControl(new mapboxgl.NavigationControl());

  return (
   
      <div>
      <div ref={mapContainer} className="map-container" />
      </div>
      );
}

export default MapContainer;