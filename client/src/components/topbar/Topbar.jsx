import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import homeicon from "../../images/homeicon.png";
import compassicon from "../../images/compassicon.png";
import personicon from "../../images/personicon.png";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const [show, setShow] = useState(false);

  const handlelogout = () => {
    setShow(false);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <h1>fit share</h1>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              {user && <img src={homeicon} alt="homeicon" />}
            </Link>
          </li>

          <li className="topListItem">
            <Link className="link" to="/nearByEvents">
              {user && <img src={compassicon} alt="compassicon" />}
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              {user && <img src={compassicon} alt="compassicon" />}
            </Link>
          </li>

          <li className="topListItem">
            <nav>
              <button
                className="personInfo"
                type="button"
                onClick={() => setShow(!show)}
              >
                <span>
                  {user && <img src={personicon} alt="compassicon" />}
                </span>
              </button>
              <div
                style={show ? { display: "inline-block" } : { display: "none" }}
                className="optionswindow"
              >
                <ul className="optionsList">
                  <li>
                    <Link className="link" to="/profile">
                      profile
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/login" onClick={handlelogout}>
                      log out
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </li>
          <li className="topListItem">
            <Link className="link" to="/login">
              {!user && "Login"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
