import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../App";


function Completed() {
    const [Did, setDid] = useState([]);
    const val = useContext(MyContext);
    
    useEffect(() => {
        if (Did.length !== 0) {
            localStorage.setItem("completed", JSON.stringify(Did));
        } else if (localStorage.getItem("completed") !== null) {
            if (
                localStorage.getItem("completed").length !== 2 &&
                localStorage.getItem("completed").length !== Did
            ) {
                const DidLS = localStorage.getItem("completed");
                setDid([...Did, ...JSON.parse(DidLS)]);
            }
        }
    }, []);
    useEffect(() => {
        if (Did.length !== val.cmplt.length){
        setDid([...val.cmplt])}
    },[val.cmplt])
    useEffect(() => {
        if (Did.length !== val.cmplt.length){
        val.setCmplt([...Did])}
    },[Did])
    
    function removeItem(id) {
        setDid(Did.filter((item) => {
            console.log(item.id, id)
            if (item.id === id) {
                console.log('done')
                return false
            }
            return item
        }))
    }

    const style = {
        cursor: 'context-menu',
    }
    const styleHead = {
        fontFamily : 'Futura',
    }

    return (
        <Row className="justify-content-center p-3">
            <Col xs="12" className="d-flex justify-content-center"><h3 style={styleHead}>Compleated Task</h3></Col>
            {Did.map((item) => {
                return (
                    <Col xs="12" key={item.id} className="px-2">
                        <Card className="p-2 shadow my-1 smallCard">
                            <div className="row">
                                <Col xs="9" className="textColor">{item.value}</Col>
                                <Col xs="3" onClick={()=>removeItem(item.id)} style={style} className='clear'>Clear</Col>
                            </div>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
}

export default Completed;