import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import "./ColumnComponent.scss";

export default class TaskComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
      // ,
      // groupID: this.props.group.group_id
    };

    this.displayTasks = this.displayTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searching = this.searching.bind(this);
  }

  componentDidMount() {
    this.displayTasks();
  }

  // getGroup(group) {
  //   axios.get(`/api/get_group/${group}`).then(group => {
  //     this.setState({
  //       group: group.data[0]
  //     })
  //   })
  //   this.displayTasks(group);
  // }

  displayTasks() {
    axios
      .get(`/api/display_tasks/${this.props.group.group_id}`)
      .then(response => {
        this.setState({
          tasks: response.data
        });
      });
  }

  addTask(task_name, column_id) {
    axios.post(`/api/add_task`, { task_name, column_id }).then(res => {
      this.setState({
        tasks: res.data
      });
    });
  }

  updateTask(task_id, task_name) {
    axios.put(`/api/update_task/${task_id}`, { task_name }).then(res => {
      this.setState({
        tasks: res.data
      });
    });
  }

  deleteTask(task_id) {
    axios.delete(`/api/delete_task/${task_id}/`).then(res => {
      this.setState({
        tasks: res.data
      });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.updateTask(this.state.tasks.task_name, this.state.tasks.task_id);
  }

  searching = e => {
    this.setState({ filterer: e.target.value.substr(0, 20) });
  };

  render() {
    let mappedTasks;
    let task = [];
    for (var i = 0; i < this.state.tasks.length; i++) {
      if (
        this.state.tasks[i]["column_id"] === this.props.allColumns.column_id
      ) {
        task.push(this.state.tasks[i]);
        mappedTasks = task.map((allTasks, index) => {
          return (
            <Draggable draggableId={allTasks.task_id.toString()} index={index}>
              {provided => (
                <div
                  className="task"
                  key={allTasks.task_id}
                  // index={index}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <h1 className="task-name">{allTasks.task_name}</h1>
                  {console.log("OHHHHHHHHH SNAPPPPPP")}
                </div>
              )}
            </Draggable>
          );
        });
        // if (mappedTasks.length) {
        //   console.log(mappedTasks);
        //   console.log(mappedTasks[0].props);
        //   console.log("draggableId", mappedTasks[0].props.draggableId);
        //   console.log("index", mappedTasks[0].props.index);
        // }
      }
    }
    return (
      <div className="column-container">
        {/* <input
          className='task-search'
          type="text"
          placeholder="search for tasks"
          onChange={this.searching}
        /> */}
        {console.log("reeeeeeeeerenderingggggggggg")}
        {this.displayTasks()}
        <div className="column-header">
          <h3>{this.props.allColumns.column_name}</h3>
          <i className="far fa-edit"></i>
          <i onClick={this.addTask} className="fas fa-plus"></i>
        </div>
        <Droppable droppableId={this.props.allColumns.column_id.toString()}>
          {provided => (
            <div
              className="mapped-tasks"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {mappedTasks}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
