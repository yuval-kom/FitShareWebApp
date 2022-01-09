import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./nearByEvents.css";
import axios from "axios";
import { useLocation } from "react-router";
import NearEvents from "../../components/nearEvents/NearEvents";
import MapContainer from "../../components/map_container/MapContainer";
import Posts from "../../components/posts/Posts";


export default function NearByEvents() {
  const [event, setevent] = useState([]);
  const { search } = useLocation();

  const [viewport, setViewport] = useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      });
    });
  }, [viewport]);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  
  // const filter_posts = posts.filter(
  //   (p) =>
  //    (Math.abs(p.lan-viewport.longitude) < 0.5 ) && (Math.abs(p.lat - viewport.latitude) <0.5)
  // );

  // //sort from the highest like
  // const top_posts = filter_posts.sort(function (a, b) {
  //   return b.likes - a.likes;
  // });


  return (
    <>
      <Header />
      <div className="nearByEvents">
        current long = {viewport.longitude} 
          current lat = {viewport.latitude} 
     

        {/* <NearByEvents posts={posts}/> */}
        <NearEvents posts={posts} />
       <MapContainer className="Map" /> 
        
      </div>
    </>
  );
}
