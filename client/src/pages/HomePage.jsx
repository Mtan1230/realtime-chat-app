import { useState } from 'react';

import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Homepage = () => {
  const [login, setLogin] = useState(false);
  const [key, setKey] = useState('login');

  return (
    <div id='home'>
      {login ? (
        <div>Homepage</div>
      ) : (
        <Container>
          <Row className='vh-100 justify-content-center align-items-center'>
            <Col xs={12} md={6} >
              <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className='mb-3'
              >
                <Tab eventKey='login' title='Login'>
                  <LoginForm setLogin={setLogin}/>
                </Tab>
                <Tab eventKey='signup' title='Signup'>
                  <SignupForm />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};
export default Homepage;
