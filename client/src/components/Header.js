import React from 'react';
import { AuthConsumer } from './AuthContext';
import { Link } from 'react-router-dom';

export default () => (
    <div>
      <AuthConsumer>
        {({ isAuth, logout }) => (
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Logo</a>
                {isAuth ? (
                  <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><button onClick={(e) => logout(e)}>Logout</button></li>
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
        )}
      </AuthConsumer>
    </div>
  )
  