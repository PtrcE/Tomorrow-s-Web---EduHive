import React, { useState, useEffect } from "react";
import { Container, VStack } from "@chakra-ui/react";
import PostCard from "../components/PostCard";
import CreatePostBox from "../components/CreatePostBox";
import axios from "axios";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "https://eduhive-s4wm.onrender.com/api/posts"
      );
      console.log("Fetched posts:", res.data);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <CreatePostBox onPostSubmit={handleNewPost} />
        {posts.map((post) => (
          <PostCard
            key={post._id}
            postId={post._id}
            title={post.title}
            body={post.body}
            author={post.author}
            createdAt={post.createdAt}
            upvotes={post.upvotes}
            comments={post.comments}
            currentUser={user}
          />
        ))}
      </VStack>
    </Container>
  );
};

export default HomePage;
