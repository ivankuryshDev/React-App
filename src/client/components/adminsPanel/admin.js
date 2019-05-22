import React, { Component } from 'react';

import EditUser from './editUser';
import Login from '../login';
import AddInvitationTable from './addInvitationTable';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [ ] ,
      role: null,
      message: null
    };

  }
  componentWillMount() {
    const lists = this.getLists();
    this.setState({ lists });
  }

  getLists() {
    return this.state.lists;
  }
  
  onAdd(email, role) {
    const lists = this.getLists();
    lists.push({
      email,
      role
    });
    this.setState({ lists });
  }

  componentDidMount() {
    fetch('/api/admin')
      .then(res => res.json())
      .then(res => this.setState({ role: res.role }));
    return fetch('/api/admin/admin_list')
      .then(res => res.json())
      .then(res => this.setState({ lists: res, message: res.message }))
  }

  render() {
    return (
      <div className=''>
        {this.state.role === 'admin' || this.state.role === 'superAdmin' ?
          <div className=''>
            <div className="row">
              <div className="col-2">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Всі користувачі</a>
                  <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Додати користувача</a>
                </div>
              </div>
              <div className="col-10">
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                  <AddInvitationTable />
                  </div>
                  <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">  
                    <div className="card bg-light mb-3">
                      <div className="card-header">Всі користувачі</div>
                      <div className="card-body">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Email</th>
                              <th scope="col">Role</th>
                              <th scope="col"></th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.lists.map(list => {
                                return (
                                  <EditUser
                                    key={list.email}
                                    {...list}
                                    onDelete={this.onDelete}
                                    onEditSubmit={this.onEditSubmit}
                                  />
                                );
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : this.state.role === null ? <Login />
            : <div className="error404">
              <h1>Error 404</h1>
              <h2>Page not found!</h2>
            </div>
        }
      </div>
    );
  }
}
export default Admin;