import { Container, Flex, Spinner, VStack } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';

import Post from './components/post';
import Navbar from './components/navbar';

import db from './lib/firebase';

const App = () =>  {
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    // Hook to handle the initial fetching of posts
    db.collection('post')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        setPosts(data);
      });
  }, []);

  return (
    <Container maxW="md" centerContent p={8}>
      <Navbar />
      <VStack spacing={8} w="100%">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </VStack>
    </Container>
  );
};

export default App;
