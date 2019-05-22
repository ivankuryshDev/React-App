import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/logo.png';
class Register extends Component {
	constructor() {
    super();
    this.state = {
      errorOnSubmit: null,
      messageOnSubmit: null,
      email: "",
      message: null,
      error : null,
      res: null,
      token: null
    }
  }
  
componentDidMount(){
	this.setState({token: this.props.match.params.token }); 
  fetch(`/api/signup/${this.state.token}`)
  .then(res => res.json())
  .then(res => this.setState({ message: res.message ,
     email: res.email, 
     error: res.error,
     messageOnSubmit: res.messageOnSubmit,
    errorOnSubmit: res.errorOnSubmit}));
}

	render() {
		return (
      <div className="registration-wrap">
        <div className="login-html">
          <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Реєстрація</label>
          <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label htmlFor="tab-2" className="tab"></label>
          <div className="login-form">
            <div id="login-logo">
              <img id="login-logo" src={logo} className="App-logo" alt="logo" />
            </div>
            {this.state.messageOnSubmit ? 
              <div>
              <span>{this.state.messageOnSubmit}</span>
              <br></br>
              <Link className="btn btn-primary" to="/">На Головну</Link>
              </div>
              : this.state.error ? 
              <div>
              <span></span> 
              <br></br>
              <Link className="btn btn-primary" to="/">На Головну</Link>
              </div>
              :
            <form method="POST" action={`/api/signup/${this.state.token}`} className=" form-horizontal">
              <div className="sign-in-htm">
                <div className="group">
                  <label htmlFor="user" className="label">Емейл</label>
                  <input required name="email" value={this.state.email} type="hidden" className="input"/>
                  <input id="email" name="email" value={this.state.email} disabled type="email" className="input"/>
                </div>
                <div className="group">
                  <label htmlFor="email" className="label">Емейл для сповіщень</label>
                  <input required autoComplete="email" id="email" name="secondEmail" type="email" className="input" placeholder="Введіть емейл для сповіщень"/>
                </div>
                <div className="group">
                  <label htmlFor="name" className="label">Ім'я</label>
                  <input required name="name" id="name" type="text" className="input" placeholder="Введіть ім'я"/>
                </div>
                <div className="group">
                  <label htmlFor="email" className="label">Пароль</label>
                  <input required autoComplete="password" id="password" name="password" type="password" className="input"  placeholder="Пароль"/>
                </div>
                <div className="group">
                  <label htmlFor="email" className="label">Підтвердження паролю</label>
                  <input required autoComplete="password" id="password" name="confirmPassword" type="password" className="input" placeholder="Підтвердження паролю"/>
                </div>
                <div className="group">
                  <span className="text-warning">{this.state.errorOnSubmit ? this.state.errorOnSubmit: " "}</span>
                  <span className="text-success">{this.state.messageOnSubmit ? this.state.messageOnSubmit: " "}</span>
                </div>
                <div className="br"></div>
                <div className="group">
                  <button type="submit" className="btn btn-block btn-primary">Надіслати</button>
                </div>
                <div className="hr"></div>
              </div>
            </form>
            }
            <div className="for-pwd-htm"></div>
          </div>
        </div>
      </div>
		);
	}
}
export default Register;
