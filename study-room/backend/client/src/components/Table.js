import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Table = ({ table }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/table/${table._id}`}>
                <Card.Img src={table.image} variant='top' />
            </Link>
            <Card.Body>
            <Link to={`/table/${table._id}`}>
                <Card.Title as='div'><strong>{table.name}</strong></Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <strong>Capacity: </strong>{table.capacity}
                </div>
            </Card.Text>
            <Card.Text as='div'>
                <div className='my-3'>
                    <strong>Availability: </strong>{table.isEmpty}
                </div>
            </Card.Text>
            <Card.Text as='p'>{table.description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Table
