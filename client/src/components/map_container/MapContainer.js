import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import ReactMapGL, { Marker, Popup } from "react-map-gl";

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute",
};

const MapContainer = () => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    ></ReactMapGL>
  );
  /*const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoieWVzdW1pbSIsImEiOiJja3h0OGlzOHcxMGR5MnNtcDRwYmxvcmViIn0.QMw9KnE29uVzWjKSSG2WLw";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/{Yesumim}/streets-v11", // stylesheet location
        center: [31.4117, 35.0818],
        zoom: 5,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
       });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />; */
};
export default MapContainer;

// import L from "leaflet";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// const markerIcon = new L.icon({
//   iconUrl: "../../images/pin.png",
//   iconSize: [40, 40],
//   iconAnchor: [17, 46],
//   popupAnchor: [0, -46],
// });

// const addMarker = (e) => {
//   const { markers } = this.state;
//   markers.push(e.latlng);
//   this.setState({ markers });
// };

// const Mapcomponent = () => {
//   return (
//     <div class="mapComponent">
//       <MapContainer
//         center={[31.4117, 35.0818]}
//         zoom={8}
//         scrollWheelZoom={false}
//         style={{ height: 500, width: "80%" }}
//         onclick={addMarker}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={} icon={markerIcon}>
//           <Popup>
//             <span>
//               A pretty CSS3 popup. <br /> Easily customizable.
//             </span>
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// };

// export default Mapcomponent;

//export default MapContainer;

//   AIzaSyC-6vvFnV4-d5ZAeyfVvmfPALhZyc6c5Hg
