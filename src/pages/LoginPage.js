import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const LoginPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://eduhive-s4wm.onrender.com/api/auth/login",
        formData
      );
      const token = res.data.token;
      const username = res.data.username;

      localStorage.setItem('token', token);
      login(username); // update context
      navigate('/');
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
    }
  };

  // ✅ This must be inside the component
  return (
    <Container maxW="md" py={8}>
      <Box p={6} borderWidth={1} borderRadius="md" boxShadow="md">
        <VStack spacing={4} align="stretch">
          <Heading size="lg" textAlign="center">Welcome Back to EduHive</Heading>

          <form onSubmit={handleSubmit}>
            <FormControl isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            </FormControl>

            <FormControl isRequired mb={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" value={formData.password} onChange={handleChange} />
            </FormControl>

            <Button colorScheme="yellow" width="100%" type="submit">Login</Button>
          </form>

          <Text fontSize="sm" textAlign="center">
            Don't have an account? <a href="/signup" style={{ color: 'blue' }}>Sign up</a>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginPage;
