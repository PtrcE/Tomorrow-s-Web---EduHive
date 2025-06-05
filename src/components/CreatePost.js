import React, { useState } from 'react';
import {
  Box,
  Input,
  Textarea,
  Button,
  VStack,
  FormLabel,
} from '@chakra-ui/react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      body,
      author: 'Anonymous',
      createdAt: new Date().toISOString(),
      upvotes: 0,
      comments: 0,
    };

    console.log('Submitting post:', newPost);
    // Here you would send it to your backend using fetch or axios
  };

  return (
    <Box maxW="md" mx="auto" mt={6}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Box>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Box>
          <Box>
            <FormLabel>Body</FormLabel>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </Box>
          <Button type="submit" colorScheme="teal">
            Create Post
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreatePost;
