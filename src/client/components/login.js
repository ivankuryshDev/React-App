import React, { Component } from 'react';

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
            <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label htmlFor="tab-2" className="tab">Registration</label>
            <div className="login-form">
              <form method="POST" action="/api/login" className=" form-horizontal">
                <div className="sign-in-htm">
                  <div className="group">
                    <label htmlFor="user" className="label">Email</label>
                    <input id="email" name="email" type="text" className="input" placeholder="Введіть email" ref={emailInput => this.emailInput = emailInput} required/>
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
              <div className="for-pwd-htm">

                {/* <div class="group">
                  <label for="user" class="label">Username or Email</label>
                  <input id="user" type="text" class="input" />
                </div>
                <div class="group">
                  <input type="submit" class="button" value="Reset Password" />
                </div>
                <div class="hr"></div> */}
                
              </div>
            </div>
          </div>
      </div>

      // <div className="container mt-4">
      //   <h1>Сторінка Авторизації</h1>
      //   <div className="row d-flex align-items-center">
      //     <div className="col">
      //       <form method="POST" action="/api/login" className=" form-horizontal">
      //         <input type="text" className="form-control"
      //           id="email" name="email" placeholder="Введіть email" ref={emailInput => this.emailInput = emailInput} required />
      //         <br></br>
      //         <input type="password"
      //           className="form-control" id="password" name="password"
      //           placeholder="Введіть пароль" ref={passwordInput => this.passwordInput = passwordInput} required />
      //         <div className="input-group input-sm">
      //           <a href="/password_reset" id="forgotpass">Забули пароль?</a>
      //         </div>
      //         <div className="form-actions">
      //           <input type="submit"
      //             className="btn btn-block btn-primary btn-default" value="Ввійти" />
      //         </div>
      //       </form>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Login;
