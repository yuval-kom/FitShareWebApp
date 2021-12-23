import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2]; //gets the id from the adress

  const { user: currentUser } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [likes, setLikes] = useState("");
  const [like, setLike] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [tag, setTag] = useState("");
  const [participents, set_participents] = useState([]);
  const [n_participents, set_n_participents] = useState(0);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      // setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLikes(res.data.likes);
      setAuthor(res.data.username);
      setDate(res.data.createdAt);
      setTag(res.data.tag);
      set_participents(res.data.participents);
      set_n_participents(participents.length);
    };
    getPost();
  }, [path]);

  /*
  useEffect(() => {
    setIsLiked(likes.includes(currentUser._id));
    console.log(likes);
  }, [currentUser._id, likes]);

  useEffect(() => {
    setIsJoined(participents.includes(currentUser.username));
    console.log(participents);
  }, [currentUser.username, participents]);
  */
  /*
  useEffect(() => {
    set_n_participents(participents.length);
    console.log(like);
  }, [ participents]);
  */
  useEffect(() => {
    setIsLiked(likes.includes(currentUser._id));
    setIsJoined(participents.includes(currentUser.username));
    setLike(likes.length);
    set_n_participents(participents.length);
    console.log(n_participents);
  }, [currentUser._id, likes, currentUser.username, participents]);

  const likeHandler = async () => {
    try {
      axios.put("/posts/" + path + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handlejoin = async () => {
    if (author !== currentUser.username) {
      try {
        axios.put("/posts/" + path + "/join", {
          username: currentUser.username,
        });
      } catch (err) {}
      set_n_participents(isJoined ? n_participents - 1 : n_participents + 1);
      setIsJoined(!isJoined);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: currentUser.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    //console.log(currentUser.username);
    try {
      await axios.put("/posts/" + path, {
        username: currentUser.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      {currentUser ? (
        <div className="singlePostWrapper">
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">
              {title}
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fas fa-thumbs-up"
                  onClick={likeHandler}
                ></i>
                <span> {like} likes</span>
                {currentUser.username == author ? (
                  <span>
                    <i
                      className="singlePostIcon far fa-edit"
                      onClick={() => setUpdateMode(true)}
                    ></i>
                    <i
                      className="singlePostIcon far fa-trash-alt"
                      onClick={handleDelete}
                    ></i>
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </h1>
          )}
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:
              <b> {author}</b>
            </span>
            {updateMode ? (
              <input
                type="text"
                value={tag}
                className="singlePostTaginput"
                autoFocus
                onChange={(e) => setTag(e.target.value)}
              />
            ) : (
              <span>
                Tag:
                <Link to={`/?cat=${tag}`} className="link">
                  <b> #{tag}</b>
                </Link>
              </span>
            )}
            <i className="singleJoinIcon fab fa-angellist" onClick={handlejoin}>
              {" "}
              join
            </i>
            <span>participents: {n_participents}</span>
            <span className="singlePostDate">
              {new Date(date).toDateString()}
            </span>
          </div>

          {updateMode ? (
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">{desc}</p>
          )}
          {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
      ) : (
        <Link className="link" to="/login"></Link>
      )}
    </div>
  );
}
