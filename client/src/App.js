import Home from "./pages/home/Home";
import TopBar from "./components/topbar/Topbar.jsx";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import NearByEvents from "./pages/nearByEvents/NearByEvents";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          {" "}
          {user ? <Home /> : <Login />}{" "}
        </Route>
        <Route path="/register">{<Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/nearByEvents">{<NearByEvents />}</Route>
        <Route path="/profile">{<Profile />}</Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
