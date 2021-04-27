import React, { Component } from 'react';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.tableName}</td>
    <td>{props.exercise.usedby}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);



    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

 

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} />;
    })
  }

  render() {
    return (
      <div>
        <h3>History</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}