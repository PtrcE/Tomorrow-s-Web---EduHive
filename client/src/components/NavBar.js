import React, { useContext } from 'react';
import { Box, Flex, Button, Image, Text } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import logo from '../assets/EduHiveLogo.png';

const NavBar = () => {
  const { username, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      bgGradient="linear(to-r, #0B4B88, #5CA4E5)"
      color="white"
      px={6}
      py={4}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <Flex justify="space-between" align="center" minH="120px">
        {/* Left spacer with Home button */}
        <Box>
          <Button
            as={RouterLink}
            to="/"
            variant="outline"
            color="white"
            borderColor="white"
            _hover={{ bg: 'whiteAlpha.300' }}
          >
            Home
          </Button>
        </Box>

        {/* Center: Logo + tagline */}
        <Box ml={20} textAlign="center">
          <RouterLink to="/">
            <Image
              src={logo}
              alt="EduHive Logo"
              height="100px"
              objectFit="contain"
              mx="auto"
            />
          </RouterLink>
          <Text fontSize="md" mt={2}>
            Connect. Share. Learn with fellow students.
          </Text>
        </Box>

        {/* Right: Auth or User buttons */}
        <Flex gap={4} align="center">
          {username ? (
            <>
              <Text fontWeight="bold" mr={2}>{username}</Text>
              <Box
                bg="#FFFDF0"
                px={4}
                py={2}
                borderRadius="md"
                boxShadow="md"
              >
                <Button
                  variant="link"
                  color="#0B4B88"
                  onClick={handleLogout}
                  fontWeight="medium"
                  _hover={{
                    transform: 'scale(1.05)',
                    textDecoration: 'underline',
                    color: '#063768',
                  }}
                >
                  Logout
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box
                bg="#FFFDF0"
                px={4}
                py={2}
                borderRadius="md"
                boxShadow="md"
              >
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="link"
                  color="#0B4B88"
                  fontWeight="medium"
                  _hover={{
                    transform: 'scale(1.05)',
                    textDecoration: 'underline',
                    color: '#063768',
                  }}
                >
                  Login
                </Button>
              </Box>

              <Box
                bg="#FFFDF0"
                px={4}
                py={2}
                borderRadius="md"
                boxShadow="md"
              >
                <Button
                  as={RouterLink}
                  to="/signup"
                  variant="link"
                  color="#0B4B88"
                  fontWeight="medium"
                  _hover={{
                    transform: 'scale(1.05)',
                    textDecoration: 'underline',
                    color: '#063768',
                  }}
                >
                  Signup
                </Button>
              </Box>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
