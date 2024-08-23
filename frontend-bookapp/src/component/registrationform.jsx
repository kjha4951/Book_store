import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { BookContext } from '../context/BookContext';

/**
 * RegisterForm component allows users to register by providing their email and password.
 * 
 * It handles form submission and redirects to the login page upon successful registration.
 */
const RegisterForm = () => {
  // State hooks for form inputs and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Context for registration function
  const { register } = useContext(BookContext);

  // Hook for navigation
  const navigate = useNavigate();

  /**
   * Handle form submission.
   * Registers the user and then redirects to the login page.
   * 
   * @param {Object} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      // Display error message on the screen
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <Container className="mt-5 d-flex  justify-content-center">
      <Form onSubmit={handleSubmit} style={{ backgroundColor: 'transparent', width: '300px' }}>
        <h4 className="mb-4 text-center">Register</h4>
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}
        <Form.Group className="mb-3">
          <Form.Label className="visually-hidden">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            size="sm"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="visually-hidden">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            size="sm"
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100" size="sm">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;


