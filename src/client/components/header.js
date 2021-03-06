import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../../public/logo.png';
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			role: '',
			name: ''
		};
		this.logout = this.logout.bind(this);
  }
  
	componentDidMount() {
		fetch('/api/')
			.then(res => res.json())
			.then(res => this.setState({ role: res.role, id: res.id, name: res.name }))
			.catch(err => err);
	}

	logout() {
		fetch('/api/logout', { method: 'GET' });
		this.setState({ role: '' });
	}
	
	showUser() {
		let userRole = '';
		switch(this.state.role) {
			case 'admin':
				userRole = 'Адміністратор';
				break;
			case 'superAdmin':
				userRole = 'Директор';
				break;
			case 'user':
				userRole = 'Користувач';
				break;
		}
		return userRole;
	}

	render() {
		if (this.state.role === 'admin' || this.state.role === 'superAdmin' || this.state.role === 'user' ) {
			return (	
				<header>
					<nav className="navbar navbar-expand-lg d-flex flex-row">													
						<div className='collapse navbar-collapse d-flex flex-row justify-content-between'>
							<ul className="navbar-nav">										
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Меню</a>
									<div className="dropdown-menu" id="dropdown-menu-header" aria-labelledby="navbarDropdown">
										<Link className="dropdown-item" to="/setting">Налаштування</Link>
										{this.state.role === 'admin' || this.state.role === 'superAdmin' ? (
										<Link className="dropdown-item" to="/admin">Адмін</Link>
										):(
											<div></div>
										)
										}
									</div>
								</li>
							</ul>
              <ul className="navbar-nav">
                <a className="navbar-brand" href="/">
									<img id="logo" src={logo} className="App-logo" alt="logo" />
								</a>
              </ul>
							<ul className='navbar-nav'>
								<li className='nav-item userHeader'>
									<Link to='/setting' className='nav-link'>{this.showUser() + ' ' + this.state.name}</Link>
								</li>
							</ul>
							<ul className='navbar-nav'>
								<li className='nav-item'>
									<Link className="nav-link" to="/login" onClick={this.logout}>Вийти</Link>	
								</li>
							</ul>
						</div>						
					</nav>
				</header>
			);
		} else {
			return (
				<div></div>
			);
		}
	}
}
export default Header;