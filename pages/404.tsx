import React from 'react'
import { Button, Center } from '@chakra-ui/react'

const Page404 = () => {
  return (
    <>
      <Center marginTop={'51px'} color='rgba(0, 0, 0, 0.8)' fontSize={'64px'} fontWeight={700}>
        404
      </Center>
      <Center margin={'41px 0'} color='rgba(0, 0, 0, 0.8)' fontSize={'24px'} fontWeight={700}>
        This  is not the web page you are looking for.
      </Center>
      <Center>
        <Button width={112} height={'40px'} bg={'rgba(254, 215, 226, 0.73)'} size='sm' borderRadius='20px' border={'1px solid rgba(0, 0, 0, 0.8)'} mx={'auto'}>
          TOP
        </Button>
      </Center>
    </>
  )
}

export default Page404