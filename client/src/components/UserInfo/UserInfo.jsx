import "./userInfo.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";

export default function UserInfo() {
  const { user: currentUser } = useContext(Context);

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
