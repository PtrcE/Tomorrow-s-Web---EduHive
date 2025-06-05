import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  HStack,
  IconButton,
  Icon,
  VStack,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import CommentModal from "./CommentModal";
import { ChatIcon } from "@chakra-ui/icons";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";


const PostCard = ({
  title,
  body,
  author,
  createdAt,
  upvotes,
  comments: initialComments,
  postId,
  currentUser,
}) => {
  const [votes, setVotes] = useState(upvotes || 0);
  const [userVote, setUserVote] = useState(0);

  const [commentsCount, setCommentsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/posts/${postId}/comments/count`)
      .then((res) => setCommentsCount(res.data.count))
      .catch(console.error);
  }, [postId]);

  
  useEffect(() => {
    if (isModalOpen) {
      axios
        .get(`/api/posts/${postId}/comments`)
        .then((res) => setComments(res.data))
        .catch(console.error);
    }
  }, [isModalOpen]);

  const handleUpvote = async () => {
    try {
      const res = await axios.post(`/api/posts/${postId}/upvote`, {
        userId: currentUser._id,
      });
      setVotes(res.data.upvotes);
      setUserVote(res.data.userVote);
    } catch (err) {
      console.error("Error upvoting", err);
    }
  };

  const handleDownvote = async () => {
    try {
      const res = await axios.post(`/api/posts/${postId}/downvote`, {
        userId: currentUser._id,
      });
      setVotes(res.data.upvotes);
      setUserVote(res.data.userVote);
    } catch (err) {
      console.error("Error downvoting", err);
    }
  };
  
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `https://eduhive-s4wm.onrender.com/api/posts/${postId}/comments`,
        {
          author: currentUser?.username || "Anonymous",
          text: newComment,
        }
      );
      
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };
  

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={5}
        bg="white"
        boxShadow="md"
        transition="all 0.2s"
        _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
      >
        <VStack align="start" spacing={2}>
          <Heading size="md" color="#0B4B88">
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Posted by {author} •{" "}
            {createdAt
              ? new Date(createdAt).toLocaleString()
              : "Date not available"}
          </Text>
          <Divider />
          <Text>{body}</Text>
        </VStack>

        <HStack spacing={4} mt={4} align="center">
          <HStack spacing={1}>
            <Tooltip label="Upvote" hasArrow>
              <IconButton
                icon={<Icon as={FaThumbsUp} />}
                aria-label="Thumbs Up"
                onClick={handleUpvote}
                variant={userVote === 1 ? "solid" : "ghost"}
                colorScheme="green"
                size="sm"
              />
            </Tooltip>
            <Text>{votes}</Text>
          </HStack>

          <HStack spacing={1}>
            <Tooltip label="Downvote" hasArrow>
              <IconButton
                icon={<Icon as={FaThumbsDown} />}
                aria-label="Thumbs Down"
                onClick={handleDownvote}
                variant={userVote === -1 ? "solid" : "ghost"}
                colorScheme="red"
                size="sm"
              />
            </Tooltip>
          </HStack>

          <HStack spacing={1}>
            <Tooltip label="Comments" hasArrow>
              <IconButton
                icon={<ChatIcon />}
                aria-label="Comments"
                variant="ghost"
                size="sm"
                onClick={openModal}
              />
            </Tooltip>
            <Text>{commentsCount}</Text>
          </HStack>
        </HStack>
      </Box>
      <CommentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        postId={postId}
        title={title}
        body={body}
        currentUser={currentUser}
        comments={comments}
        setComments={setComments}
        setCommentsCount={setCommentsCount}
      />
      ;
    </>
  );
};

export default PostCard;
