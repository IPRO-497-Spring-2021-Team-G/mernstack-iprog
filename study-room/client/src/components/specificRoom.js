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
      tables: [],
   //   capacity,
     // description
    }
  }

  componentDidMount() {


    axios.get('http://localhost:5000/tables/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            //tables: response.data.map(table => table.tableName),
           // tableName: this.props.match.params,
            tableName: response.data[0].tableName,
            capacity: response.data[0].capacity,
            description:response.data[0].description
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

    const table={
      isempty:"False"
    }
    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

      axios.post('http://localhost:5000/tables/update/607f4dcdf78f562ab0a4ce37', table)
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
          <input 
              type="text" 
              className="form-control"
              value={this.state.tableName}
              onChange={this.onChangeTablename}
              />
        </div>
        <div className="form-group"> 
          <label>Capacity: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.capacity}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.description}
              />
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