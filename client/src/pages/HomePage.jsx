import { useState } from 'react';

import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import WorkspaceList from '../components/WorkspaceList.jsx';
import Auth from '../utils/auth';

const Homepage = () => {
  const login = Auth.loggedIn();
  const [key, setKey] = useState('login');

  return (
    <div id='home'>
      <Container>
        <Row className='vh-100 justify-content-center align-items-center'>
          <Col xs={12} md={6}>
            {login ? (
              <WorkspaceList />
            ) : (
              <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className='mb-3'
              >
                <Tab eventKey='login' title='Login'>
                  <LoginForm />
                </Tab>
                <Tab eventKey='signup' title='Signup'>
                  <SignupForm />
                </Tab>
              </Tabs>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Homepage;
