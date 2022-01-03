import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import LocationAutoComplete from "../../components/LocationAutoComplete/LocationAutoComplete.js";
export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");

  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      tag,
      participents: [user.username], // by default the creator is participent
    };
    try {
      const res = await axios.post("/posts", newPost);
      try {
        await axios.post("/categories", { name: tag });
        window.location.replace("/post/" + res.data._id);
      } catch (err) {}
    } catch (err) {}
  };
  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeTag">
          <input
            type="text"
            placeholder="Tag"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <div>
          <LocationAutoComplete></LocationAutoComplete>
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>

        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
