import { useEffect, useState, useRef } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./locationAutoComplete.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm96aXIiLCJhIjoiY2t4eXk4OTh0NDFsNjJwa295dnhuenZpeiJ9.InyVe5fMqWD45VwgODrmng";

function MapContainerGeo(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(35.0818155);
  const [lat, setLat] = useState(31.4117257);
  const [zoom, setZoom] = useState(7);

  const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false, // Do not use the default marker style
    placeholder: "Search for places in Israel", // Placeholder text for the search bar
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(geocoder);
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      props.onChangeCoordinate(
        map.current.getCenter().lng.toFixed(4),
        map.current.getCenter().lat.toFixed(4)
      );
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container-geo" />
    </div>
  );
}

export default MapContainerGeo;
