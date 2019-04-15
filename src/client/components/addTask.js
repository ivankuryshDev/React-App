import React, { Component } from 'react';

class addTask extends Component {
	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(event){
		event.preventDefault();
    this.props.onAddTask(this.nameInput.value);
		this.nameInput.value = '';
	}

	render() {
		return (
				<div className="row">
					<div className="card add-card">
						<ul className="list-group list-group-flush">

							<li className="list-group-item">
								<form onSubmit={this.onSubmit}>
									<div className="form-group">
                    <div className="input-group-append">
										  <input placeholder="Name" className="form-control" ref={nameInput => this.nameInput = nameInput}/>
										  <button className="btn btn-success">Add</button>
                    </div>
									</div>
								</form>
							</li>

						</ul>
					</div>
				</div>
		);
	}
}

export default addTask;