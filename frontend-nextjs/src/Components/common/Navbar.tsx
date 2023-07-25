import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col'
import { Button, Row } from 'react-bootstrap';
import Link from 'next/link';
import auth from '@/utils/auth';

function NavbarComponent() {
  
  const isLoggedIn = !!auth.getToken();

  function handleLogout() {
    auth.logout();
  }

  return (
    <Navbar className="bg-info">
      <Container>
        <Link href="/">
        <Navbar.Brand>Blog App</Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Row className='text-center items-center'>

            {
              isLoggedIn ?
              (
                <>
                  <FontAwesomeIcon size='3x' icon={faCircleUser} className="p-0" />
                  <Navbar.Text className="p-0" onClick={handleLogout}>
                    <Link href="/login">Log out</Link>
                  </Navbar.Text>
                </>
              )
              :
              (
                <Link href="/login">
                  <Button variant="secondary">
                    Log in
                  </Button>
                </Link>
              )
            }

            </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;