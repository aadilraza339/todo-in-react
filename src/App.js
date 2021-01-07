import axios from 'axios';
import React, { Component } from "react";

export default class App extends Component {
  constructor() {
  super();
  this.state = {
    name: ""
  };
  this.getTodos = this.getTodos.bind(this);
}

componentDidMount() {
  this.getTodos();
}

async getTodos() {
  let data = await axios
    .get('http://localhost:8000/')
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
  this.setState({ todos: data.data });
}

    state = {
      name: '',
    }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name
    };

    axios.post(`http://localhost:8000/add`, { user })
      .then(res => {
        this.getTodos();
        console.log(res);
      })
  }
  deleteTodo (e){
    axios.delete(`http://localhost:8000/delete/`+e)
      .then(res => {
        this.getTodos();
      })

  }
  render() {
    const { todos } = this.state
    return (
      <div>
        <h3>add your todo</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="name"  onChange={this.handleChange} />
          </label>
          <a href='/add'><button class='add-button' type="submit">Add</button></a>
        </form>
        <hr />
        {todos &&
          todos.map(todo => {
            return (
              <table>
                <tr>
                  <td>
                  <span>{todo.task}</span>
                  <button className='delete' onClick={()=> this.deleteTodo(todo.id)}>Delete</button>
                  </td>
                </tr>
              </table>
            );
          })}
      </div>
    );
  }
}
