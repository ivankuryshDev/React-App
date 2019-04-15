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

    
  }
  onDeleteList(){
    console.log("Clicked: Delete");
    const {onDeleteList, id} = this.props;
		onDeleteList(id);
  }

  onDeleteTask(taskId){
    const {onDeleteTask, id} = this.props;
    console.log("Clicked Delete Task 2: " + taskId + " And List " + id);
    onDeleteTask(id, taskId);
  }
  onEdit(){
    this.setState({ isEdit: true });
  }
  onEditList(event){
    event.preventDefault();
    this.props.onEditList(this.nameInput.value, this.props.id);
		this.setState({ isEdit: false });
  }
  onEditTask(taskId, taskName){
    const {onEditTask, id} = this.props;
    console.log("id: ", id);
    console.log("taskId: ", taskId);
    console.log("taskName: ", taskName);
    onEditTask(id, taskId, taskName);
  }

  onAddTask(name){
    const {onAddTask, id} = this.props;
    console.log("List id: ", this.props.id);
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
  
  render() {
    const {id, name, tasks} = this.props;
    return (
      <Router>
        {
          this.state.isEdit
					? (
            <form onSubmit={this.onEditList}>
              <div className="form-group mb-3">
                <div className="input-group-append">
								  <input placeholder="Name" className="form-control" ref={nameInput => this.nameInput = nameInput} defaultValue={name}/>
								  <button className="btn btn-success">Save</button>
							  </div>
							</div>
            </form>
          )
					: (
            <div>
              <div className="input-group mb-3" id="head-list">
                <input id="head-list-input" type="text" className="form-control" value={name} aria-label="Text input with checkbox" disabled/>
                <div className="input-group-append">
                  <button type="button" className="btn btn-primary" onClick={this.onEdit}>E</button>
                  <button id="head-button-delete" type="button" className="btn btn-danger" onClick={this.onDeleteList}>X</button>
                </div>
              </div>
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
                  <AddTask onAddTask={this.onAddTask}/>
                ):(
                  <button type="button" className="btn btn-success add-task-button" onClick={this.onAddTaskInput}>Add task</button>
                )
              }
              
            </div>
          )
        }
      </Router>
    );
  }
}
export default ListItem;