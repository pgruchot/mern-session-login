import React from 'react';
import { AuthConsumer } from './AuthContext';
import { Link } from 'react-router-dom';

export default () => (
    <div>
      <AuthConsumer>
        {({ isAuth }) => (
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Logo</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/">Home</Link></li>
                {isAuth ? (
                  <div>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                  </div>
                ) : (
                  <li><Link to="/login">Login</Link></li>
                )}
              </ul>
          </div>
        </nav>
        )}
      </AuthConsumer>
    </div>
  )
  