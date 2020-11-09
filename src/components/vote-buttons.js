import { IconButton, Text, VStack } from '@chakra-ui/core';
import React, { useState } from 'react';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import db from '../lib/firebase';

// responsible for rendering an upvote and downvote button
const VoteButtons = ({ post }) => {
  // responsible for saving the vote to the database
  const handleClick = async (type) => {

    // Do calculation to save the vote.
    let upVotesCount = post.upVotesCount;
    let downVotesCount = post.downVotesCount;

    const date = new Date();

    if (type === 'upvote') {
      upVotesCount = upVotesCount + 1;
    } else {
      downVotesCount = downVotesCount + 1;
    }

    await db.collection('posts').doc(post.id).set({
      title: post.title,
      upVotesCount,
      downVotesCount,
      createdAt: post.createdAt,
      updatedAt: date.toUTCString(),
    });
  };

  return (
    <>
      <VStack>
        <IconButton 
          size='lg' 
          colorScheme='green' 
          aria-label='Upvote'
          icon={<FiArrowUp />}
          onClick={() => handleClick('upVotes')} 
        />
        <Text bg='gray.100' rounded='md' w='100%' p={1}>
          {post.upVotesCount}
        </Text>
      </VStack>
      <VStack>
        <IconButton 
          size='lg' 
          colorScheme='yellow' 
          aria-label='Downvote'
          icon={<FiArrowDown />}
          onClick={() => handleClick('downVotes')} 
        />
        <Text bg='gray.100' rounded='md' w='100%' p={1}>
          {post.downVotesCount}
        </Text>
      </VStack>
    </>
  );
};

export default VoteButtons;