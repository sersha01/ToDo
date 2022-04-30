import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col} from "react-bootstrap";

function Header() {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const date = new Date();
    const day = date.getDay()
  return (
    <Row className="justify-content-center p-3">
      <Col xs="12" className="d-flex justify-content-center py-4">
      <h2>Today is &nbsp;{days[day]}</h2>
          </Col>
    </Row>
  );
}
    
export default Header;