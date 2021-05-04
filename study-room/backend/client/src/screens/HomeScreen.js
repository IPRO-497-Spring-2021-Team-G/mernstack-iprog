import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Table from '../components/Table'
import tables from '../tables'


const HomeScreen = () => {
    return (
        <>
        <h1>Find Your Study Space</h1>
        <Row>
            {tables.map(table => (
                <Col sm={12} md={6} lg={4} xl={3}>
                    <Table table={table} />
                </Col>
            ))}
        </Row>
        </>
    )
}

export default HomeScreen
