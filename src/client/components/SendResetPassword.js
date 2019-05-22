import React, { Component } from 'react';
import logo from '../../../public/logo.png';
class SendResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      message: null,
      error : null,
      res: null
    }
  }
  
  componentDidMount(){
    fetch("/api/password_reset")
    .then(res => res.json())
    .then(res => this.setState({ message: res.message ,
      error: res.error ? res.error : " "}));
  }

	render() {
		return (
      <div className="login-wrap">
        <div className="login-html">
          <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Відновлення паролю</label>
          <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label htmlFor="tab-2" className="tab"></label>
          <div className="login-form">
            <div id="login-logo">
              <img id="login-logo" src={logo} className="App-logo" alt="logo" />
            </div>
            <form method="POST" action="/api/password_reset" className="form-horizontal">
              <div className="sign-in-htm">
                <div className="group">
                  <label htmlFor="email" className="label">Email</label>
                  <input name="email" type="email" className="input" id="email" aria-describedby="emailHelp" placeholder="Введіть емейл"/>
                </div>
                <div className="group">
                  <input type="submit" className="button" value="Надіслати" />
                </div>
                <div className="group">
                  <a type="submit" className="btn btn-primary" href='/'><i className="fa fa-arrow-left"></i> На головну</a>
                </div>
                <span className="text-warning">{this.state.error ? this.state.error: " "}</span>
                <span className="text-success">{this.state.message ? this.state.message: " "}</span>
                <div className="hr"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
		);
	}
}
export default SendResetPassword;