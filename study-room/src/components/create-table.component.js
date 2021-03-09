import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTable extends Component {
  constructor(props) {
    super(props);

    this.onChangeTablename = this.onChangeTablename.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      tableName: ''
    }
  }

  onChangeTablename(e) {
    this.setState({
      tableName: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const table = {
      tableName: this.state.tableName
    }

    console.log(table);

    axios.post('http://localhost:5000/tables/add', table)
      .then(res => console.log(res.data));

    this.setState({
      tableName: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New table</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Table Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.tableName}
                onChange={this.onChangeTablename}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Table" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}