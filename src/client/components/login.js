import React, { Component } from 'react';
import logo from '../../../public/logo.png';
class Login extends Component {

  componentDidMount() {
    fetch('/api/login')
      .then(res => res.json());
  }

  render() {
    return (
      <div className="login-wrap">
        <div className="login-html">
          <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Вхід</label>
          <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label htmlFor="tab-2" className="tab">Реєстрація</label>
          <div className="login-form">
            <div id="login-logo">
              <img id="login-logo" src={logo} className="App-logo" alt="logo" />
            </div>
            <form method="POST" action="/api/login" className=" form-horizontal">
              <div className="sign-in-htm">
                <div className="group">
                  <label htmlFor="email" className="label">Email</label>
                  <input id="emailEnter" name="email" type="text" className="input" placeholder="Введіть email" ref={emailInput => this.emailInput = emailInput} required/>
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">Пароль</label>
                  <input id="password" name="password" type="password" className="input" data-type="password" placeholder="Введіть пароль" ref={passwordInput => this.passwordInput = passwordInput} required/>
                </div>
                <div className="group">
                  <a href="/password_reset" id="forgotpass" className="label">Забули пароль?</a>
                </div>
                <div className="group">
                  <input type="submit" className="button" value="Ввійти" />
                </div>
                <div className="hr"></div>
              </div>
            </form>
            <form method="POST" action="api/invite_many" className="form-horizontal">
              <div className="for-pwd-htm">
                <div className="group">
                  <label htmlFor="email" className="label">Email</label>
                  <input name="email" type="email" className="input" id="email" aria-describedby="emailHelp" placeholder="Введіть емейл" required/>
                </div>
                <div className="group">
                  <input type="submit" className="button" value="Надіслати" />
                </div>
                <div className="group">
                  <span className="text-success">*На вказаний емайл буде відіслано запрошення на реєстрацію</span>
                </div>
                <div className="hr"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
