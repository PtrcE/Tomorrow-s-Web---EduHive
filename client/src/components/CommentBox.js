// CommentBox.js
import { Box, Text } from "@chakra-ui/react";

const CommentBox = ({ comment }) => {
  return (
    <Box p={3} bg="gray.200" borderRadius="md" w="100%">
      <Text>
        <Text as="span" fontWeight="bold" mr={2}>
          {comment.author || "Anonymous"}:
        </Text>
        {comment.text}
      </Text>
    </Box>
  );
};

export default CommentBox;
