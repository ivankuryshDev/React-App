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
          },
          {
            id: 3,
            taskName: 'Make money evsd gsr rfserfgestg sfregesr rgtdrgesh lkmglsem sgmeklg sgkl gskel',
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
            isСompleted: true
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
      lists: lists,
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
		const lists = this.getLists();
		this.setState({lists});
		console.log(lists);
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
      lists.push({
			  id,
			  name
      });
    }
    
    this.setState({lists});
    this.setState({ isAdded: false});
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
          console.log("isСompleted: ", lists[item].tasks[task].isСompleted);
          lists[item].tasks[task].isСompleted = value;
        }
      }
    }
    this.setState({ lists: lists });
    console.log("Updated object: ", lists);
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
                      <div key={list.id} className="col-4">
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