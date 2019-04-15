import React, { Component } from 'react';
import { BrowserRouter as Router,
   Link, Redirect } from 'react-router-dom';
import Login from './login';
import ListItem from './listItem';
import AddList from './addList';

var newE = true;
if (newE){
	var lists = [
		{
			id: 1,
			name: 'iPad',
			tasks: [
          {
            id: 1,
            taskName: 'To do smg',
            isСompleted: false
          },
          {
            id: 2,
            taskName: 'Make money',
            isСompleted: false
          }
			]
		},
		{
			id: 2,
			name: 'Second',
			tasks: [
          {
            id: 1,
            taskName: 'Wash the car',
            isСompleted: false
          },
          {
            id: 2,
            taskName: 'Go shopping',
            isСompleted: false
          }
			]
		}
	];
	
}
var id;

export default class Home extends Component {
  constructor(props) {
		super(props);
		this.state = {
      role: null,
      id: null,
      name: null,
      lists: lists
    };
    
    this.onAddList = this.onAddList.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
		this.onDeleteList = this.onDeleteList.bind(this);
		this.onDeleteTask = this.onDeleteTask.bind(this);
		this.onEditList = this.onEditList.bind(this);
		this.onEditTask = this.onEditTask.bind(this);
  }

  componentWillMount(){
		const lists = this.getLists();
		this.setState({lists});
		console.log(lists);
	}

	getLists(){
		return this.state.lists;
	}
  
  onAddList(name){
    console.log("Name: ", name);
    const lists = this.getLists();
    id = lists.length + 1;
    console.log("Length: ", lists.length);
    lists.push({
			id,
			name
    });
    this.setState({lists});
  }
  onAddTask(listId, taskName){
    console.log("=== Id: ", listId);
    console.log("=== Name: ", taskName);

    const lists = this.getLists();
    for(var item in lists){

      if(lists[item].id === listId){
        var id = lists[item].tasks.length + 1;
        console.log("Clicked weiljirgt:", id);
        lists[item].tasks.push({
          id,
          taskName
        });
      }
      this.setState({lists});
      console.log("All Object:", lists);
    }

  }
  onDeleteList(listId){
    const lists = this.getLists();
    const filteredList = lists.filter(list => {
      return list.id !== listId;
    });
    this.setState({lists: filteredList});
  }

  onDeleteTask(listId, taskId){
    const lists = this.getLists();
    for(var item in lists){
      for(var task in lists[item].tasks){
        console.log("Clicked wergt:", lists[item].tasks[task].id);
        if(lists[item].tasks[task].id === taskId && lists[item].id === listId){
          delete lists[item].tasks[task];
        }
      }
    }
    this.setState({lists: lists});
  }

  onEditList(name, id){
    let lists = this.getLists();
		lists = lists.map(list => {
			if (list.id === id){
				list.name = name;
			}
			return list;
		});

		console.log("onEditList: ", name);
		this.setState({ lists });
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
  }

  componentDidMount() {
    fetch('/api/')
		.then(res => res.json())
    .then(res => this.setState({ role: res.role, id: res.id, name: res.name }))    
    .catch(err => err);    
  }

  render() {
    const { role } = this.state;
      return (
        <div className='container'>
          {role ?
          <div id="task-table">
            <h3>Task Manager</h3>
            <br></br>
            <div className="row">
              {
                this.state.lists.map((list) => {
                  return (
                    <div key={list.id} className="col-3">
                      <div className="list">
                        <ListItem
                          key={list.id}
                          {...list}
                          onDeleteList={this.onDeleteList}
                          onDeleteTask={this.onDeleteTask}
                          onEditList={this.onEditList}
                          onEditTask={this.onEditTask}
                          onAddTask={this.onAddTask}
                        />
                      </div>
                    </div>
                  );
                })
              }                
              
              <div className="col-3">
                <div className="add-list">
                  <AddList onAddList={this.onAddList}	/>
                </div>
              </div>
            </div>
          </div>
          
        : <Login />}
        </div>
      );
  }
}