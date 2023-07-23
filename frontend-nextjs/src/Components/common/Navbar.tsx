import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col'
import { Row } from 'react-bootstrap';

function NavbarComponent() {
  return (
    <Navbar className="bg-info">
      <Container>
        <Navbar.Brand href="#home">Blog App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Row className='text-center items-center'>

              <FontAwesomeIcon size='3x' icon={faCircleUser} className="p-0" />
              <Navbar.Text className="p-0">
                  <a href="#login">Mark Otto</a>
              </Navbar.Text>

            </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;