import "./userInfo.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";

import axios from "axios";

export default function UserInfo() {
  const { user: currentUser } = useContext(Context);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);


  const { user, dispatch } = useContext(Context);


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
  };


  return (
    <div className="UserInfo">
      <span className="userName">{currentUser.username}</span>
      <span className="userfullname">
        {currentUser.name != null ? currentUser.name : ""}
      </span>
      <span className="userinfo">
        {currentUser.info != null ? currentUser.info : ""}
      </span>
    </div>
  );
}
