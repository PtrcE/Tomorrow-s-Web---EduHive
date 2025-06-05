import { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Box,
  HStack,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";
import CommentBox from "./CommentBox";

const CommentModal = ({
  isOpen,
  onClose,
  postId,
  title,
  body,
  currentUser,
  comments,
  setComments,
  setCommentsCount,
}) => {
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`/api/posts/${postId}/comments`)
        .then((res) => setComments(res.data))
        .catch(console.error);
    }
  }, [isOpen, postId, setComments]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `/api/posts/${postId}/comments`,
        {
          author: currentUser?.username || "Anonymous",
          text: newComment,
        }
      );
      setComments((prev) => [...prev, res.data]);

      if (setCommentsCount) {
        setCommentsCount((prev) => prev + 1);
      }

      setNewComment("");
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>{body}</Text>

          <Divider my={4} borderColor="blackAlpha.500" />

          <VStack
            align="start"
            spacing={3}
            minH="300px"
            maxH="500px"
            overflowY="auto"
            mb={4}
          >
            {comments.length === 0 ? (
              <Text color="gray.500" w="100%" textAlign="center">
                No comments yet. Be the first!
              </Text>
            ) : (
              comments.map((comment) => (
                <CommentBox key={comment._id || comment.id} comment={comment} />
              ))
            )}
          </VStack>

          <Divider my={4} borderColor="blackAlpha.500" />

          <HStack>
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button colorScheme="yellow" onClick={handleAddComment}>
              Comment
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
