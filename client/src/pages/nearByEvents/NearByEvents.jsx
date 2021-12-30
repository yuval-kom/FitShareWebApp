import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/nearEvents/NearEvents";
import "./nearByEvents.css";
import axios from "axios";
import { useLocation } from "react-router";
import nearEvents from "../../components/nearEvents/NearEvents";
import MapContainer from "../../components/map_container/MapContainer";

export default function NearByEvents() {
  const [event, setevent] = useState([]);
  const { search } = useLocation();

  /*useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);*/

  return (
    <>
      <Header />
      <div className="nearByEvents">
        <MapContainer />
      </div>
    </>
  );
}
