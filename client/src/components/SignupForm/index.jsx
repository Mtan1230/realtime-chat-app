import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../../utils/mutations';

import { Form, Button } from 'react-bootstrap';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [signup] = useMutation(SIGNUP);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup({
      variables: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      },
    });
    if (response.data.signup.token) {
      localStorage.setItem('id_token', response.data.signup.token);
      window.location.assign('/');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type='text'
          name='firstName'
          placeholder='Enter first name'
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type='text'
          name='lastName'
          placeholder='Enter last name'
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

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
        Sign Up
      </Button>
    </Form>
  );
};

export default SignupForm;
