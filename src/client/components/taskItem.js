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
		this.handleInputChange = this.handleInputChange.bind(this);
  }

  onDeleteTask(){
    const {onDeleteTask, id} = this.props;
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
  handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log("target: ", target);
    console.log("value: ", value);
    console.log("name: ", name);
    console.log("this.props.isСompleted: ", this.props.isСompleted);
    this.props.handleInputChange(this.props.id, value);
  }

  render() {
    const {id, taskName, isСompleted} = this.props;
    return (
      <Router>
        {
          this.state.isEdit
					? (
            <li className="list-group-item">
              <div className="row no-gutters">
                <div className="col">
                  <form onSubmit={this.onEditTask}>
                    <div className="form-group mb-3">
                      <div className="input-group-append">
                        <div className="row no-gutters">
                          <div className="col-8">
                          <input placeholder="Name" className="form-control" ref={nameInput => this.nameInput = nameInput} defaultValue={taskName} required/>
                          </div>
                          <div className="col-4">
                            <div className="ui-group-buttons">
                              <button className="btn btn-success"><i className="fa fa-check"></i></button>
                              <div className="or"></div>
                              <button className="btn btn-danger" onClick={this.onEdit}><i className="fa fa-close"></i></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </li>
          )
					: (
            <li className="list-group-item box1">
              <div className="row no-gutters">
                
                <div className="col-2">
                  <label className="checkbox">
                    <input type="checkbox" defaultChecked={isСompleted} onChange={this.handleInputChange}/>
                    <span className="danger"></span>
                  </label>
                </div>
                
                <div className="col-8">
                  <p className="task">
                    {
                      isСompleted ?
                      (
                        <s><span>{taskName}</span></s>
                      ):(
                        <span>{taskName}</span>
                      )
                    }
                  </p>
                </div>
                
                <ul className="icon">
                    <li><a href="#" className="button-close" onClick={this.onDeleteTask}><i className="fa fa-close"></i></a></li>
                    <li><a href="#" className="button-edit" onClick={this.onEdit}><i className="fa fa-edit"></i></a></li>
                </ul>
              </div>
            </li>
          )
        }
      </Router>
    );
  }

}
export default TaskItem;