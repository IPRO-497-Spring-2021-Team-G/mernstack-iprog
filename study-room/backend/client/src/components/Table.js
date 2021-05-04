import React from 'react'
import { Card } from 'react-bootstrap'

const Table = ({ table }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/table/${table._id}`}>
                <Card.Img src={table.image} variant='top' />
            </a>
            <Card.Body>
            <a href={`/table/${table._id}`}>
                <Card.Title as='div'><strong>{table.name}</strong></Card.Title>
            </a>
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
