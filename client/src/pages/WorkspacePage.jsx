import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Button,
  Image,
  Form,
  InputGroup
} from 'react-bootstrap';

const WorkspacePage = () => {
  return (
    <>
      <Container fluid className=''>
        <Row className='vh-100'>
          <Col xs={4} md={3} className='py-5 bg-primary'>
            Sidebar
          </Col>
          <Col xs={8} md={9} className='py-5 bg-primary-subtle'>
            main container
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default WorkspacePage;
