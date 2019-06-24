import React from 'react';
import withAuthContext from './withAuthContext';

const Landing = (props) => (
  <div className="container">
      {props.context.isAuth ? (
        <div className="center">
                <h2>Landing Page. Current user:</h2>
                <h2>{JSON.stringify(props.context.user)}</h2>
        </div>
      ) : (
        <h2>Landing Page, please Log in</h2>    
      )}
  </div>
)

export default withAuthContext(Landing);
