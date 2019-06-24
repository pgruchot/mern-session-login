import React from 'react';
import withAuthContext from './withAuthContext';

const Dashboard = (props) => (
    <div className="container">
            <h2>Protected Route, Dashboard. Current user:</h2>
            <p>{JSON.stringify(props.context.user)}</p>
    </div>
)

export default withAuthContext(Dashboard);