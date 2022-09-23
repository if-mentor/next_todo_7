import React from 'react'
import { Button, Center } from '@chakra-ui/react'

const Page404 = () => {
  return (
    <>
      <Center marginTop={12} color={'blackAlpha.800'} fontSize={'6xl'} fontWeight={700}>
        404
      </Center>
      <Center my={10} color={'blackAlpha.800'} fontSize={'2xl'} fontWeight={700}>
        This  is not the web page you are looking for.
      </Center>
      <Center>
        <Button width={28} height={10} bg={'rgba(254, 215, 226, 0.73)'} size='lg' borderRadius={'full'} border={'1px'} mx={'auto'} borderColor={'blackAlpha.800'}>
          TOP
        </Button>
      </Center>
    </>
  )
}

export default Page404