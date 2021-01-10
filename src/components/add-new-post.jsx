import { 
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  useDisclosure,
  Textarea,
  } from '@chakra-ui/core';

import React, { useState } from 'react';
import db from '../lib/firebase';

const AddNewPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [isSaving] = useState(false);

  const handleSubmit = async () => {
    const date = new Date();

    await db.collection('posts').add({
      title,
      upVotesCount: 0,
      downVotesCount: 0,
      createdAt: date.toUTCString(),
      updatedAt: date.toUTCString(),
    });

    onClose();
    setTitle('');
  };

  return (
    <>
    
      <Button onClick={onOpen} colorScheme='blue'>
        Adicionar Postagem
      </Button> 
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Adicionar postagem</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id='post-title'>
                <FormLabel>Titulo da postagem</FormLabel>
                <Textarea 
                  type='post-title' 
                  value={title} 
                  onChange={(e)=> setTitle(e.target.value)} 
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <HStack spacing={4}>
                <Button onClick={onClose}>Fechar</Button>
                <Button
                  onClick={handleSubmit}
                  colorScheme='blue'
                  disabled={!title.trim()}
                  isLoading={isSaving}
                  >
                    Postar
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default AddNewPost;