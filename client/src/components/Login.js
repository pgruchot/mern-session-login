import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { AuthConsumer } from './AuthContext';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateErrors = this.updateErrors.bind(this);

    };

    updateErrors(errmsg) {
        this.setState({
            errmsg
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    
    render() { 
        const errors = this.state.errmsg ? ( 
        <div>
            <h2>{this.state.errmsg}</h2>
        </div>) : (null);
        return(
            <div>
                <AuthConsumer>
                    {({ isAuth, login }) => (
                         isAuth ? (
			                <Redirect to={{ pathname: '/' }} /> 
                        ) : (
                            <div>
                                {errors}
                                <div className="container">
                                    <div className="row">
                                        <form className="col s12">
                                            <div className="row">
                                                <div className="input-field col s6">
                                                    <input placeholder="Placeholder" name="username" type="text" className="validate"  onChange={this.handleChange}/>
                                                    <label for="username">Username</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="input-field col s6">
                                                    <input name="password" type="password" className="validate" onChange={this.handleChange}/>
                                                    <label for="password">Password</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <button className="btn waves-effect waves-light" onClick={(e) => {login(e, this.state.username, this.state.password, this.updateErrors)}}>Submit
                                                    <i className="material-icons right">send</i>
                                                </button>
                                            </div>
                                            <div className="row">
                                                <a href="http://localhost:5000/auth/facebook" className="btn">Sign in with facebook</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>) 
                        
                    )}
                </AuthConsumer>
            </div>
        );
    }
}

export default Login;