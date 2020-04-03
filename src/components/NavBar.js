import React from 'react';
import { Link, NavLink, withRouter } from "react-router-dom";

const Navbar = (props) => {
    // console.log(props);
    setTimeout(() => {
        // props.history.push('/about')
    }, 5000);
    return (
      <header className="header">
        <nav className="nav-wrapper red darken-3">
          <div className="container">
            <a className="brand-logo">Refine Packaging</a>
            <ul className="right">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/practice">Practice</NavLink>
              </li>
              <li>
                <NavLink to="/postFromReducer">Posts</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
}

export default withRouter(Navbar)
