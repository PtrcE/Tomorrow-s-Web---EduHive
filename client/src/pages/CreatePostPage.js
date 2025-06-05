import React, { useState } from 'react';
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
} from '@chakra-ui/react';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      author: "Anonymous",
      title,
      body,
    };
    

    try {
      const res = await axios.post(
        "https://eduhive-s4wm.onrender.com/api/posts",
        newPost
      );
      console.log("Post created:", res.data);
    } catch (error) {
      console.error("Error posting:", error);
    }
  };


  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>Create a New Post</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input 
              placeholder="Enter post title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Body</FormLabel>
            <Textarea
              placeholder="Enter post content"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </FormControl>

          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreatePostPage;
