import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTable extends Component {
  constructor(props) {
    super(props);

    this.onChangeTablename = this.onChangeTablename.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeIsEmpty = this.onChangeIsEmpty.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      tableName: '',
      capacity:0,
      description:'',
      isempty:'True'
    }
  }

  onChangeTablename(e) {
    this.setState({
      tableName: e.target.value
    })
  }

  onChangeCapacity(e) {
    this.setState({
      capacity: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeIsEmpty(e) {
    this.setState({
      isempty: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const table = {
      tableName: this.state.tableName,
      capacity: this.state.capacity,
      description: this.state.description,
      isempty:this.state.isempty
    }

    console.log(table);

    axios.post('http://localhost:5000/tables/add', table)
      .then(res => console.log(res.data));

    this.setState({
      tableName: '',
      capacity:0,
      description:'',
      isempty:'True'
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
          <label>Capacity: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.capacity}
              onChange={this.onChangeCapacity}
              />
        </div>

        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>

        <div className="form-group"> 
          <label>Available: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.isempty}
              onChange={this.onChangeIsEmpty}
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