import "./profile.css";
import Header from "../../components/header/Header";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";


export default function Profile() {
  
  const [username, setusername] = useState("");  // cant be edited 
  const [emai, setemail] = useState("");  //cant be edite 
  const [password, setpassword] = useState("");

  const { user } = useContext(Context);

 
  return (
    <>
      <Header />
      <div className="profile"> PROFILE</div>
    </>

    
  );
}
