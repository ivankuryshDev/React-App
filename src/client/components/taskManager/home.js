import React, { Component } from 'react';

import Login from '../login';
import ListItem from './listItem';
import AddList from './addList';

export default class Home extends Component {
  constructor(props) {
		super(props);
		this.state = {
      role: null,
      id: null,
      name: null,
      lists: [],
      isAdded: false
    };
    this.onAddList = this.onAddList.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
    this.onAddListInput = this.onAddListInput.bind(this);
		this.onDeleteList = this.onDeleteList.bind(this);
		this.onDeleteTask = this.onDeleteTask.bind(this);
		this.onEditList = this.onEditList.bind(this);
		this.onEditTask = this.onEditTask.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    fetch('/api/')
      .then(res => res.json())
      .then(res => this.setState({ role: res.role, userId: res.id, name: res.name}))
      .then(res => {
          fetch(`/api/${this.state.userId}`)
            .then(res => res.json())
            .then(res => this.setState({ lists: res.taskLists, email: res.email, message: res.message }))
            .catch(err => err);
          }
      ).catch(err => err);
	}

	getLists(){
		return this.state.lists;
	}
  
  onAddList(name){
    const lists = this.getLists();
    if(lists !== undefined){
      id = lists.length + 1;
      lists.push({
			  id,
			  name
      });
    }else{
      var id = 1;
      lists = [];
      lists.push({
			  id,
			  name
      });
    }
    this.setState({lists});
    this.setState({ isAdded: false});
    this.patchTaskLists();
  }

  onAddTask(listId, taskName){
    const lists = this.getLists();
    for(var item in lists){
      if(lists[item].id === listId){
        if(lists[item].tasks !== undefined){
          var id = lists[item].tasks.length + 1;
          lists[item].tasks.push({
            id,
            taskName,
            isСompleted: false
          });
        } else{
          var id = 1;
          lists[item].tasks = [];
          lists[item].tasks.push({
            id,
            taskName,
            isСompleted: false
          });
        }
      }
      this.setState({lists});
    }
    this.patchTaskLists();
  }
  onDeleteList(listId){
    const lists = this.getLists();
    for(var item in lists){
      if(lists[item].id === listId){
        var index = lists.findIndex(x => x.id === listId);
        lists.splice(index, 1);
      }
    }
    this.setState({lists: lists});
    this.patchTaskLists();
  }

  onDeleteTask(listId, taskId){
    const lists = this.getLists();
    for(var item in lists){
      for(var task in lists[item].tasks){
        if(lists[item].tasks[task].id === taskId && lists[item].id === listId){
          var index = lists[item].tasks.findIndex(x => x.id === taskId);
          lists[item].tasks.splice(index,  1);
        }
      }
    }
    this.setState({lists: lists});
    this.patchTaskLists();
  }

  onEditList(name, id){
    let lists = this.getLists();
		lists = lists.map(list => {
			if (list.id === id){
				list.name = name;
			}
			return list;
		});

    this.setState({ lists });
    this.patchTaskLists();
  }

  onEditTask(listId, taskId, taskName){
    let lists = this.getLists();
    for(var item in lists){
      for(var task in lists[item].tasks){
        if(lists[item].tasks[task].id === taskId && lists[item].id === listId){
          lists[item].tasks[task].taskName = taskName;
        }
      }
    }
    this.setState({ lists: lists });
    this.patchTaskLists();
  }

  onAddListInput(){
    if(this.state.isAdded){
      this.setState({ isAdded: false});
    }else{
      this.setState({ isAdded: true});
    }
  }

  handleInputChange(listId, taskId, value){
    let lists = this.getLists();
    for(var item in lists){
      for(var task in lists[item].tasks){
        if(lists[item].tasks[task].id === taskId && lists[item].id === listId){
          lists[item].tasks[task].isСompleted = value;
        }
      }
    }
    this.setState({ lists: lists });
    this.patchTaskLists();
  }

  patchTaskLists(){
    return fetch('/api/admin/taskLists', {
      method: 'PATCH',
      body: JSON.stringify({email: this.state.email, taskLists: this.state.lists }),
      headers: { 'Content-type': 'application/json' }
    }).catch(err => err);
  }

  render() {
    const { role } = this.state;
      return (
        <div className="container">
          {role ?
          <div>
            <br></br>
            <div className="row">
              {
                typeof this.state.lists !== "undefined" ?
                (
                  this.state.lists.map((list) => {
                    return (
                      <div key={list.id} className="col-xl-4 col-md-6 col-sm-12 col-12">
                        <div className="list">
                          <ListItem
                            key={list.id}
                            {...list}
                            onDeleteList={this.onDeleteList}
                            onDeleteTask={this.onDeleteTask}
                            onEditList={this.onEditList}
                            onEditTask={this.onEditTask}
                            onAddTask={this.onAddTask}
                            handleInputChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )
              }
              <div className="col-4">                              
                {
                  this.state.isAdded ?
                  (
                    <AddList onAddList={this.onAddList} onAddListInput={this.onAddListInput}/>
                  ):(
                    <div className="add-list" onClick={this.onAddListInput}>  
                      <span>+ Додати список</span>
                    </div>
                  )
                }
              </div>  
            </div>
          </div>
        : <Login />}
        </div>
      );
  }
}