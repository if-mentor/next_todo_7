import React, { useState } from 'react'
import Link from 'next/link';
import { Box, Button, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import styles from '../styles/Detail.module.css'

const Detail = () => {
  // sample
  const [comments, useComment] = useState([
    {name: 'じょん', text: 'Test Test Test Test Test Test Test'},
    {name: 'じょん', text: 'Test Test Test Test Test Test Test'},
    {name: 'じょん', text: 'Test Test Test Test Test Test Test'},
    {name: 'じょん', text: 'Test Test Test Test Test Test Test'},
    {name: 'じょん', text: 'Test Test Test Test Test Test Test'},
    {name: 'じょん', text: 'Test Test Test Test Test Test Test'},
    {name: 'じょん', text: 'Test Test Test Test Test Test Test'},
    {name: 'じょん', text: 'Test Test Test Test Test Test Test'}
  ])

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Heading bg='green.300' py={{ base: 2 }} px={{ base: 4 }}>
        TODO
      </Heading>

      <Box py={{ base: 6 }} px={{ base: 6 }}>
        <Flex justifyContent='space-between'>
          <Text className={styles.title}>Show Todo</Text>
          <Box className={styles.button_box}>
            <Button size='sm' onClick={onOpen}>Comment</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent top='20%'>
                <ModalHeader>Comment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box>
                    <Text fontWeight='bold'>Name</Text>
                    <Input />
                  </Box>

                  <Box mt='5'>
                    <Text fontWeight='bold'>Comment</Text>
                    <Textarea minH='200px' maxH='300px'/>
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' color='white'>
                    Create
                  </Button>
                  <Button colorScheme='red' mr='3' ml='10' onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Link href='/'>
              <Button className={styles.back_button} size='sm'>Back</Button>
            </Link>
          </Box>
        </Flex>

        <Box className={styles.box} my={{ base: 6 }}>
          <Box className={styles.detail_box} h='660px' p='5' border='1px' borderRadius='3xl'>
            <Box>
              <Heading pl='20px' bg='green.300'>Title</Heading>
              <Box p='10px 20px 0' minH='50px' maxH='80px' bg='white' overflow='scroll'>
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
              </Box>
            </Box>

            <Box mt='10'>
              <Heading pl='20px' bg='green.300'>Detail</Heading>
              <Box p='5' minH='360px' maxH='360px' bg='white' overflow='scroll'>
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
                Test Test Test Test Test Test Test Test Test Test Test Test Test Test 
              </Box>
            </Box>
            <Flex alignItems='center' mt='10px' p='0 20px'>
              <Button color='black' p='0 30px' size='sm' colorScheme='whatsapp' borderRadius='20px'>
                Edit
                <EditIcon ml='3'/>
              </Button>
              <Spacer />
              <Box className={styles.time} fontWeight='bold'>
                create
                <br/>
                2022/10/1
              </Box>
              <Spacer />
              <Box className={styles.time} fontWeight='bold'>
                create
                <br/>
                2022/10/1
              </Box>
            </Flex>
          </Box>

          <Box className={styles.comment_box} h='660px' p='5' overflow='scroll'>
            <Text fontWeight='bold' bg='#f5f5f5' p='2'>Comment</Text>
            {comments?.map((comment, index) => (
              <Box mt='5' border='1px' borderRadius='20px' overflow='hidden' key={index}>
                <Flex justifyContent='space-between' bg='green.300'>
                  <Text fontWeight='bold' ml='5'>{comment.name}</Text>
                  <Text mr='5'>2022/10/1</Text>
                </Flex>
                <Box p='10px 20px 0' minH='20px' bg='white'>
                  {comment.text} 
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Detail