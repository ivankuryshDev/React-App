import React, { Component } from 'react';

class AddUser extends Component {
  render() {
    return (
        <div class="row">
          <div class="col-5">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Додайте всіх користувачів яких ви хочете запросити</div>
              <div className="card-body">
                <h5 className="card-title">Додати користувача</h5>
                <form className="form-group" onSubmit={this.props.handleFormSubmit}>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">Емайл</span>
                    </div>
                    <input id="email" type="text" className="form-control" value={this.props.newEmail} type="text" placeholder="напр. someemail@gmail.com" aria-label="Email" aria-describedby="basic-addon1"
                      name="email" onChange={this.props.handleInputChange} required/>
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label className="input-group-text" htmlFor="inputGroupSelect01">Роль</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" id="role" value={this.props.newRole}  name="role" onChange={this.props.handleInputChange} required>
                      <option value="">Виберіть роль</option>
                      <option value="admin">Адміністратор</option>
                      <option value="user">Користувач</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-success btn-default" value="Submit">Додати користувача</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
export default AddUser;