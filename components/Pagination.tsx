import _ from 'lodash';
import {
  Box,
  Container,
  Flex,
  HStack,
  Button,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

const Pagination = ({items, pageSize, currentPage, onPageChange}) => {
  const pageCount = items / pageSize;
  if(Math.ceil(pageCount) === 1) return null
  const pages = _.range(1, pageCount + 1);
  return(
    <HStack justify="center" align="center">
      <Box sx={pagination} style={{ cursor:"pointer" }} onClick={() => onPageChange(currentPage-1)}>＜</Box>
      {pages.map(page => 
        <Box sx={pagination} key={page} className={page === currentPage ? "page-item active" : "page-item"} style={{ cursor:"pointer" }} onClick={() => onPageChange(page)} className="page-link">
          {page}
        </Box>
      )}
      <Box sx={pagination} style={{ cursor:"pointer" }} onClick={() => onPageChange(currentPage+1)}>＞</Box>
    </HStack>);
}

const pagination = {
  w: '40px',
  h: '40px',
  lineHeight: '40px',
  textAlign: 'center',
  borderRadius: '10px',
  border: '1px solid rgba(0, 0, 0, 0.8)',
  fontSize: '18px',
  color: 'blackAlpha.800',
};
 export default Pagination