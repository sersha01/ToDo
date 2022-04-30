import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Card } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../App";


function Cancelled() {
    const [Will, setWill] = useState([]);
    const val = useContext(MyContext);
    
    useEffect(() => {
        if (Will.length !== 0) {
            localStorage.setItem("cancelled", JSON.stringify(Will));
        } else if (localStorage.getItem("cancelled") !== null) {
            if (
                localStorage.getItem("cancelled").length !== 2 &&
                localStorage.getItem("cancelled").length !== Will
            ) {
                const WillLS = localStorage.getItem("cancelled");
                setWill([...Will, ...JSON.parse(WillLS)]);
            }
        }
    }, []);
    useEffect(() => {
        if (Will.length !== val.cncl.length){
        setWill([...val.cncl])}
    },[val.cncl])
    useEffect(() => {
        if (Will.length !== val.cncl.length){
        val.setCncl([...Will])}
    },[Will])
    
    function addItem(id) {
        setWill(Will.filter((item) => {
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
            <Col xs="12" className="d-flex justify-content-center"><h3 style={styleHead}>Cancelled Task</h3></Col>
            {Will.map((item) => {
                return (
                    <Col xs="12" key={item.id} className="px-2">
                        <Card className="p-2 shadow my-1 smallCard">
                            <div className="row">
                                <Col xs="9" className="textColor">{item.value}</Col>
                                <Col xs="3" onClick={()=>addItem(item.id)} style={style} className='clear'>Clear</Col>
                            </div>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
}

export default Cancelled;