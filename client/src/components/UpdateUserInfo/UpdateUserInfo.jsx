import "./updateUserInfo.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function UpdateUserInfo() {
  const { user: currentUser } = useContext(Context);
  const [username, setUsername] = useState(currentUser.username);
  const [name, setName] = useState(currentUser.name);
  const [info, setInfo] = useState(currentUser.info);

  const handleUpdate = async () => {
    try {
      const res = await axios.put("/auth/updateinfo", null, {
        params: {
          username: username,
          name: name,
          info: info,
        },
      });
    } catch (err) {}
  };

  return (
    <div className="UserInfo">
      <form className="updateForm" onSubmit={handleUpdate}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Name</label>
        <input
          type="text"
          className="registerInput"
          placeholder={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>about you</label>
        <input
          type="text"
          className="registerInput"
          placeholder={info}
          onChange={(e) => setInfo(e.target.value)}
        />
        <button className="UpdateButton" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
