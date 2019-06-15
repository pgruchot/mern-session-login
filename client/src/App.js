import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Header from './components/Header';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
     <AuthProvider>
      <div className="App">
        <Header />
        <Switch>
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    </AuthProvider>
  </Router>
  );
}

export default App;
