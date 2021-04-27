import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class ReserveTable extends Component {
  constructor(props) {
    super(props);

    this.onChangeTablename = this.onChangeTablename.bind(this);
    this.onChangeUsedby = this.onChangeUsedby.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      tableName: '',
      usedby: '',
      duration: 0,
      date: new Date(),
      tables: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tables/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            tables: response.data.map(table => table.tableName),
            tableName: response.data[0].tableName
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeTablename(e) {
    this.setState({
      tableName: e.target.value
    })
  }

  onChangeUsedby(e) {
    this.setState({
      usedby: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      tableName: this.state.tableName,
      usedby: this.state.usedby,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Reserve Table</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Table: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.tableName}
              onChange={this.onChangeTablename}>
              {
                this.state.tables.map(function(table) {
                  return <option 
                    key={table}
                    value={table}>{table} 
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>User Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.usedby}
              onChange={this.onChangeUsedby}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Reserve" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}