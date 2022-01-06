import { useEffect, useState, useRef } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./mapContainer.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm96aXIiLCJhIjoiY2t4eXk4OTh0NDFsNjJwa295dnhuenZpeiJ9.InyVe5fMqWD45VwgODrmng";

function MapContainer() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(35.0818155);
  const [lat, setLat] = useState(31.4117257);
  const [zoom, setZoom] = useState(7);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default MapContainer;
