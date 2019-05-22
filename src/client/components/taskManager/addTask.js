import React, { Component } from 'react';

class AddTask extends Component {
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onAddTaskInput = this.onAddTaskInput.bind(this);
  }
  
  onAddTaskInput(){
    this.props.onAddTaskInput();
  }

	onSubmit(event){
		event.preventDefault();
    this.props.onAddTask(this.nameInput.value);
		this.nameInput.value = '';
	}

	render() {
		return (
			<li className="list-group-item">
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<div className="input-group-append">
							<div className="row no-gutters">
								<div className="col-8">
								<input placeholder="Нове завдання" className="form-control" ref={nameInput => this.nameInput = nameInput} required/>
								</div>
								<div className="col-4">
									<div className="ui-group-buttons">
										<button className="btn btn-success"><i className="fa fa-check"></i></button>
										<div className="or"></div>
										<button className="btn btn-danger" onClick={this.onAddTaskInput}><i className="fa fa-close"></i></button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</li>
		);
	}
}
export default AddTask;