import React, { Component } from 'react';
import{
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/header';
import Home from './components/taskManager/home';
import Login from './components/login';
import Register from './components/register';
import Setting from './components/setting';
import Admin from './components/adminsPanel/admin';
import SendResetPassword from './components/SendResetPassword';
import ResetPassword from './components/resetPassword';

import './assets/css/app.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Header />
            <div className="container"></div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route path='/signup/:token' component={Register} />
              <Route exact path='/admin' component={Admin}/>
              <Route exact path='/setting' component={Setting}/>
              <Route path='/reset/:token' component={ResetPassword}/>
              <Route exact path='/password_reset' component={SendResetPassword}/>
              <Route exact path='/api/password_reset' component={SendResetPassword}/>              
              <Route render={() => (<div className="error404">
                                      <h1>Error 404</h1>
                                      <h2>Page not found!</h2>
                                    </div>)} />
            </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
