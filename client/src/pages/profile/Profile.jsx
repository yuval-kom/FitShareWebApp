import "./profile.css";
import Header from "../../components/header/Header";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import UserInfo from "../../components/UserInfo/UserInfo";
import UpdateUserInfo from "../../components/UpdateUserInfo/UpdateUserInfo";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [username, setusername] = useState(""); // cant be edited
  const [email, setemail] = useState(""); //cant be edite
  const [password, setpassword] = useState("");

  const { user: currentUser } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts", {
        params: {
          username: currentUser.username,
        },
      });
      setPosts(res.data);
    };
    fetchPosts();
  });

  //do setting button and update for returning
  return (
    <div className="single">
      <Header />
      <div>
        <UserInfo />
        <UpdateUserInfo />
        <Posts posts={posts} />
      </div>
    </div>
  );
}
