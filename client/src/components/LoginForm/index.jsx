import { useState } from 'react';

import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ setLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here, e.g., sending a request to your backend API
    console.log('Form Data:', formData);
    setLogin(true);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='Enter email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Log In
      </Button>
    </Form>
  );
};

export default LoginForm;
