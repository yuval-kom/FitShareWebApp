import Post from "../post/Post";
import "./nearEvents.css";
import React from "react";
import ReactMapGL, { GeolocateControl } from "react-map-gl";

export default function NearEvents({ posts }) {

  const [viewport, setViewport] = React.useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14
  });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    });
  }, [viewport]);


//  posts.map((p, index) => console.log(new Date(p.createdAt).getDay.toString));

// This adds the map to your page



  const filter_posts = posts.filter(
    (p) =>
     (Math.abs(p.lan-viewport.longitude) < 0.5 ) && (Math.abs(p.lat - viewport.latitude) <0.5)
  );
  console.log(viewport.longitude);

  //sort from the highest like
  const top_posts = filter_posts.sort(function (a, b) {
    return b.likes - a.likes;
  });

  return (

    <div className="posts">
      {top_posts.map((p, index) => (
        <li key={index}>
          {" "}
          <Post post={p} />{" "}
        </li>
      ))}
               
    </div>
  );
      }
