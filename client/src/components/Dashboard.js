import React from 'react';
import { AuthConsumer } from './AuthContext';

export default () => (
    <div>
        <AuthConsumer>
            {({ user }) => (
            <div className="container">
                    <h2>Protected Route, Dashboard. Current user:</h2>
                    <p>{JSON.stringify(user)}</p>
            </div>
            )}
        </AuthConsumer>
    </div>
)
