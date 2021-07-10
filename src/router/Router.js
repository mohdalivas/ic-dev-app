// import logo from "./logo.svg";
import { BrowserRouter as AppRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { Navbar } from "react-bootstrap";

import { PrivateRoute } from '../components'; 
import { Home } from '../views/Home';
import { Login } from '../views/Login';
import { Register } from '../views/Register';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function Router() {
  // localStorage.setItem("icUserdata", "test");
  return (
    <AppRouter>
      <div className="container bg-light p-3">
        <Navbar bg="light">
          <Navbar.Brand href="#home">iConnect infosys</Navbar.Brand>
          <nav className="navbar navbar-expand-lg navbar-light">
            <ul className="navbar-nav mr-auto">
              {localStorage.getItem("icUserdata") && (
                <li className="nav-item p-1 active">
                  <Link to="/">Home</Link>
                </li>
              )}
              <li className="nav-item p-1">
                <Link to="/login">Login</Link>
              </li>
              <li className="nav-item p-1">
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
        </Navbar>
      </div>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <div className="container p-3">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </AppRouter>
  );
}

export default Router;