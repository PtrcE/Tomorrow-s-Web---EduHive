import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack } from '@chakra-ui/react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/auth/signup",
        formData
      );
      navigate("/login");
    } catch (err) {
      console.error(
        "Signup error:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center">Sign Up</Heading>
      <form onSubmit={handleSignup}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input name="username" value={formData.username} onChange={handleChange} />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="yellow" width="full">Sign Up</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default SignupPage;
