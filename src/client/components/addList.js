import React, { Component } from 'react';

class addList extends Component {
	constructor(props){
		super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onAddListInput = this.onAddListInput.bind(this);
	}

	onSubmit(event){
		event.preventDefault();
		this.props.onAddList(this.nameInput.value);
		this.nameInput.value = '';
  }
  
  onAddListInput(){
    this.props.onAddListInput();
  }

	render() {
		return (
      <ul className="list-group fa-ul">
        <li className="list-group-item">
          <div className="row no-gutters">
            <div className="col">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="input-group-append">
                    <div className="row no-gutters">
                      <div className="col-8">
                      <input placeholder="Новий список" className="form-control input-list" ref={nameInput => this.nameInput = nameInput} required/>
                      </div>
                      <div className="col-4">
                        <div className="ui-group-buttons">
                          <button className="btn btn-success"><i className="fa fa-check"></i></button>
                          <div className="or"></div>
                          <button className="btn btn-danger" onClick={this.onAddListInput}><i className="fa fa-close"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </li>
      </ul>

		);
	}
}

export default addList;