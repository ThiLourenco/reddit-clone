import { Container, VStack } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';

import Post from './components/post';
import Navbar from './components/navbar';

import db from './lib/firebase';

const App = () =>  {
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    // Hook to handle the initial fetching of posts
    db.collection('posts')
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

  useEffect(() => {
    // Hook to handle the real-time updating of post whenever this is a
    // change in this datastore

    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const _posts = [];

        querySnapshot.forEach((doc) => {
          _posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setPosts(_posts)
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
