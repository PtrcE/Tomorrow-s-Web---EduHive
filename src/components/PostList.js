import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const samplePosts = [
  {
    id: 1,
    title: 'Best Study Tips?',
    content: 'Anyone got effective tips for staying focused during finals week?',
  },
  {
    id: 2,
    title: 'Group Project Nightmare',
    content: 'One of my groupmates is MIA. What should I do?',
  },
];

function PostList() {
  return (
    <VStack spacing={4} align="stretch">
      {samplePosts.map((post) => (
        <Box key={post.id} p={4} borderWidth="1px" borderRadius="lg">
          <Heading size="md">{post.title}</Heading>
          <Text mt={2}>{post.content}</Text>
        </Box>
      ))}
    </VStack>
  );
}

export default PostList;
