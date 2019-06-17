import React from 'react';
import { AuthConsumer } from './AuthContext';

export default () => (

     <AuthConsumer>
        {({ isAuth, user }) => (
          <div className="container">
              {isAuth ? (
                <div>
                        <h2>Landing Page. Current user:</h2>
                        <h2>{JSON.stringify(user)}</h2>
                </div>
              ) : (
                <h2>Landing Page, please Log in</h2>    
              )}
          </div>
        )}
      </AuthConsumer>

)
