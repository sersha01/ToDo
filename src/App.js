import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React from "react"; 
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import Active from './myToDo/Active'
import  Completed  from './myToDo/Completed'
import Cancelled from './myToDo/Cancelled';
import Header from './myToDo/Header'



const MyContext = React.createContext()

function App() {
    const [cncl, setCncl] = useState([]);
    const [cmplt, setCmplt] = useState([]);
    
    const Style = {
        height: '500px',
    }
        
    

    return (
        <Container fluid className='vh-100'>
            <Row>
            <Header/>
            </Row>
        <Row className='justify-content-center'>
            <MyContext.Provider value={{cncl, setCncl, cmplt, setCmplt}}>
            <Col sm='9' md='12' className='row  justify-content-lg-around'>
                <Col md='4' lg='3' className='my-2 rounded overflow-auto cardColor scroll' style={Style}>
                    <Completed />
                </Col>
                <Col md='4' lg='3' className='my-2 rounded overflow-auto cardColor scroll' style={Style}>
                    <Active />
                </Col>
                <Col md='4' lg='3' className='my-2 rounded overflow-auto cardColor scroll' style={Style}>
                    <Cancelled />
                </Col>
            </Col>
            </MyContext.Provider>
        </Row>
        </Container>
        )}

export default App;

export {
    MyContext
}