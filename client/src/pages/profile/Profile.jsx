import "./profile.css";
/*import Header from "../../components/header/Header";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import UserInfo from "../../components/UserInfo/UserInfo";
import UpdateUserInfo from "../../components/UpdateUserInfo/UpdateUserInfo";
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

*/


//import "./userInfo.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import Posts from "../../components/posts/Posts";

import axios from "axios";

export default function UserInfo() {
  const { user: currentUser } = useContext(Context);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");
  const [name, setName] = useState("");
  const [posts, setPosts] = useState([]);


  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);


  const { user, dispatch } = useContext(Context);

  const handlelogout = () => {
    dispatch({ type: "LOGOUT" });
  };


  const handleDelete = async () => {
    try {
      await axios.delete("/auth/" + user._id, {
        data: { username: currentUser.username },
      });
      window.location.replace("/login");
    } catch (err) {}
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/auth/" + user._id);
      // setPost(res.data);
      setUsername(res.data.username);
      setName(res.data.name);
      setEmail(res.data.email);
      setInfo(res.data.info);
      setPassword(res.data.password);
     
    };
    getUser();
  }, []);

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



  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    
    const updatedUser = {
      userId: user._id,
      username,
      name,
      email,
      info,
      password,
    };

    try {
      const res = await axios.put("/auth/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
    setUpdateMode(false);

  };

  return (
    <div className="profile">
      <div className="profileWrapper">
      <span>
                    <i
                      className="singlePostIcon far fa-edit"
                      onClick={() => setUpdateMode(true)}
                    ></i>
                    <Link className="link" to="/login" onClick={handlelogout}>

                       <i className="singlePostIcon far fa-trash-alt" onClick={ handleDelete} ></i>
                      
                      </Link>
                  
                  </span>
        <form className="profileForm" onSubmit={handleSubmit}>
        <label>Username</label>
       {updateMode ? 
          <input
            type="text"
            value={username}
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          :        <span  className="username">  {username}</span> 
       }



        <label>Name</label>
      { updateMode ?  
       <input
            type="name"
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />  :  <span  className="name">  {name}</span>  }

        <label>Personal Info</label>
        {updateMode ? 
          <input
            type="info"
            value={info}
            autoFocus
            onChange={(e) => setInfo(e.target.value)}
          />  : 
          <span className="personal_info">  {info} </span> }

          <label>Email</label>
         {updateMode ?  <input
            type="email"
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />  : <span  className="email"> {email} </span>  }

          {updateMode && (
          <button className="profileSubmit" type="submit" onClick={handleSubmit}>
            Update
          </button> )
          
          }
        </form>
      </div>

        <Posts posts={posts} />
    </div>
  );
}



/**
         {updateMode ? <label>passsword</label> :  <span></span>}
          {updateMode? <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
           
          />  : <span></span> }
           */