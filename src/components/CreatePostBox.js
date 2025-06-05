import React, { useState } from 'react';
import { Box, Textarea, Button, VStack, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const CreatePostBox = ({ onPostSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { username } = useUser(); // <-- get current user

  const handleSubmit = async () => {
    if (!title || !body) return;

    const newPost = {
      title,
      body,
      author: username || 'Anonymous',
    };

    try {
      const response = await axios.post(
        "/api/posts",
        newPost
      );

      onPostSubmit(response.data); // Add it to homepage
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  return (
    <Box bg="white" p={4} borderRadius="md" boxShadow="md">
      <VStack spacing={4}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="What's on your mind?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button onClick={handleSubmit} colorScheme="blue" alignSelf="flex-end">
          Post
        </Button>
      </VStack>
    </Box>
  );
};

export default CreatePostBox;
