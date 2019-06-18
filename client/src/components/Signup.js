import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
            redirectTo: '',
            errmsg: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit called...');
        axios.post('/auth/signup', {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        }).then(response => {
            if(!response.data.errmsg) {
                console.log('Youre good people');
                this.setState({
                    redirectTo: '/login'
                })
            } else {
                console.log('getting here')
                console.log(JSON.stringify(response.data));

                this.setState({
                    errmsg: response.data.errmsg
                })
            }
        })
    }
    
    render() {
        if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
        } 
        const errors = this.state.errmsg ? ( 
            <div>
                <h2>{this.state.errmsg}</h2>
            </div>) : (null);
        
        return(
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
                                        <div className="input-field col s6">
                                            <input placeholder="Placeholder" name="firstName" type="text" className="validate"  onChange={this.handleChange}/>
                                            <label for="username">First Name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input placeholder="Placeholder" name="lastName" type="text" className="validate"  onChange={this.handleChange}/>
                                            <label for="username">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input placeholder="Placeholder" name="email" type="email" className="validate"  onChange={this.handleChange}/>
                                            <label for="username">Email</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div class="input-field col s6">
                                            <input name="password" type="password" className="validate" onChange={this.handleChange}/>
                                            <label for="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div class="input-field col s6">
                                            <input name="password2" type="password" className="validate" onChange={this.handleChange}/>
                                            <label for="password2">Repeat Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button className="btn waves-effect waves-light" onClick={this.handleSubmit}>Submit
                                            <i className="material-icons right">send</i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
            </div>
        );
    }
   
}

export default Signup;