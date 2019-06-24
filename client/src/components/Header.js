import React from 'react';
import withAuthContext from './withAuthContext';
import { Link } from 'react-router-dom';

const Header = (props) => (
    <div>
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Logo</a>
                {props.context.isAuth ? (
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><button onClick={(e) => props.context.logout(e)}>Logout</button></li>
                  </ul>
                ) : (
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                  </ul>
                )}
          </div>
        </nav>
    </div>
)

export default withAuthContext(Header);
  