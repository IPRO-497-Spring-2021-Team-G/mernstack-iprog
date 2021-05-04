
import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { CardDeck } from 'reactstrap';
import { Card } from 'react-bootstrap'
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


const CardView = props => {
  return (
      <Card style={{ width: '27rem' }}>
      <Card.Img variant="top" src="https://arch.iit.edu/img/66ceb0c9ea37d546/dsc-3561.jpg" alt="pic1" />
      <Card.Body>
        <Card.Title>{props.table.tableName}</Card.Title>
        <Card.Text>
        Capacity: {props.table.capacity}
        </Card.Text>
        <Card.Text>
  Location:   {props.table.description}
  </Card.Text>
  <Card.Text>
    Availability:{props.table.isempty}
          </Card.Text>
          <button type="button" class="btn btn-dark">  <Link to={"/reserve/"+props.table._id}>Reserve</Link> </button>
    
      </Card.Body>
    </Card>
  )
}


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

  CardList(){
    return this.state.tables.map(currenttable => {
      return <CardView table={currenttable} />;
    })
    
  }

  render() {
    return (
      
      <CardDeck> 
  { this.CardList() }

  </CardDeck> 
    )
  }
}