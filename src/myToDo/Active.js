import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, InputGroup, Card, FormControl } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../App";


function Active( ) {
    const val = useContext(MyContext);
    const [toDos, setToDos] = useState([]);
    const [toDo, setToDo] = useState("");

    useEffect(() => {
        if (localStorage.getItem("completed") !== null) {
            if (
                localStorage.getItem("completed").length !== 2 &&
                localStorage.getItem("completed").length !== val.cmplt.length
            ) {
                const cmpltLS = localStorage.getItem("completed");
                val.setCmplt([...val.cmplt, ...JSON.parse(cmpltLS)]);
            }
        }
    },[])
    
    useEffect(() => {
        if (toDos.length !== 0) {
            localStorage.setItem("active", JSON.stringify(toDos));
        } else if (localStorage.getItem("active") !== null) {
            if (
                localStorage.getItem("active").length !== 2 &&
                localStorage.getItem("active").length !== toDos
            ) {
                const toDosLS = localStorage.getItem("active");
                setToDos([...toDos, ...JSON.parse(toDosLS)]);
            }
        }
    }, [toDos]);
    useEffect(() => {
        if (val.cmplt.length !== 0) {
        localStorage.setItem("completed", JSON.stringify(val.cmplt))}
    },[val.cmplt])
    useEffect(() => {
        if (val.cncl.length !== 0) {
        localStorage.setItem("cancelled", JSON.stringify(val.cncl))}
    },[val.cncl])

    function setValue(value) {
        setToDo(value);
    }
    function addItem() {
        if (toDo.length > 0) {
            setToDos([...toDos, { id: Date.now(), value: toDo, status: false }]);
            setToDo("");
        }
    }
    function compleated(id) {
        setToDos(
            toDos.filter((item) => {
                if (item.id === id) {
                    item.status = true;
                    val.setCmplt([...val.cmplt, item]);
                    return false;
                }
                return item;
            })
        );
    }
    function cancelled(id) {
        setToDos(
            toDos.filter((item) => {
                if (item.id === id) {
                    item.status = true;
                    val.setCncl([...val.cncl, item]);
                    return false;
                }
                return item;
            })
        );
    }

    const styleHead = {
        fontFamily : 'Futura',
    }

    return (
        <Row className="justify-content-center p-3">
            <Col xs="12" className="d-flex justify-content-center"><h3 style={styleHead}>Active Task</h3></Col>
            <InputGroup className="mb-3">
                <FormControl
                    value={toDo}
                    onChange={(e) => setValue(e.target.value)}
                    aria-label="Amount"
                    placeholder="Add New Item..."
                />
                <InputGroup.Text onClick={() => addItem()} className="addbtn">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </InputGroup.Text>
            </InputGroup>
            {toDos.map((item) => {
                return (
                    <Col xs="12" key={item.id} className="px-2">
                        <Card className="p-2 shadow my-1 smallCard">
                            <div className="row">
                                <Col xs="1">
                                    <input
                                        type="checkbox"
                                        onClick={() => {
                                            compleated(item.id);
                                            if (toDos.length === 1) {
                                                toDos.filter((item) => {
                                                    localStorage.setItem("active", JSON.stringify([]))
                                                    return false
                                                })
                                            }
                                        }}
                                        className="bg-light border-0"
                                    />
                                </Col>
                                <Col xs="10" className="textColor">{item.value}</Col>
                                <Col xs="1 p-0">
                                    <i
                                        onClick={() => {
                                            cancelled(item.id);
                                            if (toDos.length === 1) {
                                                toDos.filter((item) => {
                                                    localStorage.setItem("active", JSON.stringify([]))
                                                    return false
                                                })
                                            }
                                        }}
                                        className="fa fa-times x"
                                        aria-hidden="true"
                                    ></i>
                                </Col>
                            </div>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
}

export default Active
