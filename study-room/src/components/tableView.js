
import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const ViewTable = props => (
  <tr>
    <td>{props.table.tableName}</td>
    <td>{props.table.capacity}</td>
    <td>{props.table.description}</td>
    <td>{props.table.isempty}</td>
    <td>
    <Link to={"/reserve/"+props.table._id}>Reserve</Link> 
    </td>
  </tr>
)

export default class TableViewer extends Component {
  constructor(props) {
    super(props);



    this.state = {tables: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tables/')
      .then(response => {
        this.setState({ tables: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }



  tableList() {
    return this.state.tables.map(currenttable => {
      return <ViewTable table={currenttable} />;
    })
  }


  render() {
    return (
        <div>
        <h3>Find your table</h3>
        <div class="card" style={{width:"18rem"}}>
        <img class="card-img-top" src="https://arch.iit.edu/img/66ceb0c9ea37d546/dsc-3561.jpg" alt="pic1"/>
        <div class="card-body">
        <h5 class="card-title">Table A</h5>
        <p class="card-text">Description</p>
        <a href="/#" class="btn btn-primary">Reserve</a>
            </div>
            </div>

<table className="table">
          <thead className="thead-dark">
            <tr>
              <th>table name</th>
              <th>capacity</th>
              <th>Description</th>
              <th>Available</th>
              <th>Reserve</th>
            </tr>
          </thead>
          <tbody>
            { this.tableList() }
          </tbody>
        </table>
      </div>
    )
  }
}