import React, { Component } from 'react';

import{
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

import TaskItem from './taskItem';
import AddTask from './addTask';

class ListItem extends Component {
    constructor(props){
		super(props);

		this.state = {
      isEdit: false,
      isAdded: false
		};

		this.onDeleteList = this.onDeleteList.bind(this);
		this.onDeleteTask = this.onDeleteTask.bind(this);
		this.onEdit = this.onEdit.bind(this);
    this.onEditList = this.onEditList.bind(this);
    this.onEditTask = this.onEditTask.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
    this.onAddTaskInput = this.onAddTaskInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onDeleteList(){
    const {onDeleteList, id} = this.props;
		onDeleteList(id);
  }

  onDeleteTask(taskId){
    const {onDeleteTask, id} = this.props;
    onDeleteTask(id, taskId);
  }
  onEdit(){
    if(this.state.isEdit){
      this.setState({ isEdit: false });
    }else{
      this.setState({ isEdit: true });
    }
  }
  onEditList(event){
    event.preventDefault();
    this.props.onEditList(this.nameInput.value, this.props.id);
		this.setState({ isEdit: false });
  }
  onEditTask(taskId, taskName){
    const {onEditTask, id} = this.props;
    onEditTask(id, taskId, taskName);
  }

  onAddTask(name){
    const {onAddTask, id} = this.props;
    onAddTask(id, name);
    this.setState({ isAdded: false});
  }
  onAddTaskInput(){
    if(this.state.isAdded){
      this.setState({ isAdded: false});
    }else{
      this.setState({ isAdded: true});
    }
  }
  handleInputChange(taskId, value){
    const {handleInputChange, id} = this.props;
    handleInputChange(id, taskId, value);
  }
  
  render() {
    const {id, name, tasks} = this.props;
    return (
      <Router>
            <ul className="list-group fa-ul">
              <li className="list-group-item">
                <div className="row no-gutters">
                  {
                    this.state.isEdit ?
                    (
                      <div className="col">
                        <form onSubmit={this.onEditList}>
                          <div className="form-group mb-3">
                            <div className="input-group-append">

                              <div className="row no-gutters">
                                <div className="col-8">
                                  <input placeholder="Name" className="form-control input-list" ref={nameInput => this.nameInput = nameInput} defaultValue={name} required/>
                                </div>
                                <div className="col-4">
                                  <div class="ui-group-buttons">
                                    <button className="btn btn-success"><i className="fa fa-check"></i></button>
                                    <div class="or"></div>
                                    <button className="btn btn-danger" onClick={this.onEdit}><i className="fa fa-close"></i></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    ):(
                      <div className="col">
                        <div className="row no-gutters">

                          <div className="col-10">
                            <h5 className="task">{name}</h5>
                          </div>
                          
                          <div className="col-2">
                            <div className="dropdown">
                              <button className="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-cog" aria-hidden="true"></i>
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={this.onEdit}><i className="fa fa-edit fa-fw"></i>Edit</a>
                                <a className="dropdown-item" onClick={this.onDeleteList}><i className="fa fa-close fa-fw"></i>Delete</a>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    )
                  }
                </div>
              </li>
              {
                typeof tasks !== "undefined" ?
                (
                  tasks.map((task) => {
                    return (
                      <TaskItem
                          key={task.id}
                          {...task}
                          onDeleteTask={this.onDeleteTask}
                          onEditList={this.onEditList}
                          onEditTask={this.onEditTask}
                          handleInputChange={this.handleInputChange}
                          />
                          );
                        })
                ) : (
                  <div></div>
                )
              }
              {
                this.state.isAdded ?
                (
                  <AddTask onAddTask={this.onAddTask} onAddTaskInput={this.onAddTaskInput}/>
                ):(
                  <li className="list-group-item" onClick={this.onAddTaskInput}>
                    <div className="row no-gutters">
                      <div className="col">
                        <span>+ Додати завдання</span>
                      </div>
                    </div>
                  </li>
                )
              }
            </ul>
      </Router>
    );
  }
}
export default ListItem;