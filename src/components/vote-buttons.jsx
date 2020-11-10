import { IconButton, Text, VStack } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import db from '../lib/firebase';

// responsible for rendering an upvote and downvote button
const VoteButtons = ({ post }) => {
  const[isVoting, setVoting] = useState(false);
  const[votedPosts, setVotedPosts] = useState([]);

  useEffect(() => {
    // Fetch the previously voted items from localStorage
    const votesFromLocalStorage = localStorage.getItem('votes') || [];
    let previousVotes = [];

    try {
    //  Parse the value of the item from localStorage. If the value of the
    // items isn't an array, then JS will throw an error.
      previousVotes = JSON.parse(votesFromLocalStorage);
    } catch (error) {
      console.error(error);
    }

    setVotedPosts(previousVotes);
  }, []);

  // function is responsible for disabling the voting button after a user has voted.
  const handleDisablingOfVoting = (postId) => {
    const previousVotes = votedPosts;
    previousVotes.push(postId);

    setVotedPosts(previousVotes);

    // update the voted items from localstorage
    localStorage.setItem('votes', JSON.stringify(votedPosts));
  };

  // responsible for saving the vote to the database.
  const handleClick = async (type) => {
    setVoting(true);

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

    // disabled the voting button once the voting is successful.
    handleDisablingOfVoting(post.id);

    setVoting(false);
  };

  const checkIfPostIfAlreadyVoted = () => {
    if (votedPosts.indexOf(post.id) > -1) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <VStack>
        <IconButton 
          size='lg' 
          colorScheme='green' 
          aria-label='Upvote'
          icon={<FiArrowUp />}
          onClick={() => handleClick('upvote')} 
          isLoading={isVoting}
          isDisabled={checkIfPostIfAlreadyVoted()}
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
          onClick={() => handleClick('downvote')}
          isLoading={isVoting}
          isDisabled={checkIfPostIfAlreadyVoted()}
        />
        <Text bg='gray.100' rounded='md' w='100%' p={1}>
          {post.downVotesCount}
        </Text>
      </VStack>
    </>
  );
};

export default VoteButtons;