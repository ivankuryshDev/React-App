import React, { Component } from 'react';

import{
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

class TaskItem extends Component {
    constructor(props){
		super(props);

		this.state = {
			isEdit: false
		};

		this.onDeleteTask = this.onDeleteTask.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onEditTask = this.onEditTask.bind(this);
  }

  onDeleteTask(){
    const {onDeleteTask, id} = this.props;
    console.log("Clicked Delete Task 1:", id);
		onDeleteTask(id);
  }
  onEdit(){
    if(this.state.isEdit){
      this.setState({ isEdit: false });
    }else{
      this.setState({ isEdit: true });
    }
  }
  onEditTask(event){
    event.preventDefault();
    this.props.onEditTask(this.props.id, this.nameInput.value);
		this.setState({ isEdit: false });
  }


  render() {
    const {id, taskName, isСompleted} = this.props;
    return (
      <Router>
        {
          this.state.isEdit
					? (
            <form onSubmit={this.onEditTask}>
              <div className="form-group mb-3">
                <div className="input-group-append">
								  <input placeholder="Name" className="form-control" ref={nameInput => this.nameInput = nameInput} defaultValue={taskName}/>
								  <button className="btn btn-success">Save</button>
                  <button type="button" className="btn btn-danger" onClick={this.onEdit}>X</button>
							  </div>
							</div>
            </form>
          )
					: (
            <div>
              <div className="input-group mb-1">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                      <input type="checkbox" aria-label="Checkbox for following text input"/>
                    </div>
                </div>
                <input type="text" className="form-control" value={taskName} aria-label="Text input with checkbox" disabled />
                <div className="input-group-append">
                  <button type="button" className="btn btn-primary" onClick={this.onEdit}>E</button>
                  <button type="button" className="btn btn-danger" onClick={this.onDeleteTask}>X</button>
                </div>
              </div>              
            </div>
          )
        }
      </Router>
    );
  }

}
export default TaskItem;