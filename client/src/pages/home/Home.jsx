import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import useGeoLocation from "../../hooks/useGeoLocation";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const location = useGeoLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      {location.loaded
        ? JSON.stringify(location)
        : "location data not available yet"}
      <div className="home">
        <Posts posts={posts} />

        <Sidebar />
      </div>
    </>
  );
}
