import _ from 'lodash';
import {
  Box,
  HStack,
} from '@chakra-ui/react';

const Pagination = ({items, pageSize, currentPage, onPageChange}: any) => {
  const pageCount = items / pageSize;
  if(Math.ceil(pageCount) === 1) return null
  const pages = _.range(1, pageCount + 1);
  const prevpage = () => {
    if (1 === currentPage) {
      return null;
    }else{
      return onPageChange(currentPage-1);
    }
  };
  const nextpage = () => {
    if (Math.ceil(pageCount) === currentPage) {
      return null;
    }else{
      return onPageChange(currentPage+1);
    }
  };
  return(
    <HStack justify="center" align="center">
      <Box sx={pagination} style={1 === currentPage ? {cursor:"default" }:{cursor:"pointer" }} onClick={() => prevpage()} bgColor={1 === currentPage ? "blackAlpha.500" : "white"}>＜</Box>
      {pages.map(page => 
        <Box sx={pagination} key={page} bgColor={page === currentPage ? "blackAlpha.500" : "white"} color={page === currentPage ? "FFFFFF" : "blackAlpha.500"} style={page === currentPage ? {cursor:"default" }:{cursor:"pointer" }} onClick={() => onPageChange(page)}>
          {page}
        </Box>
      )}
      <Box sx={pagination} style={Math.ceil(pageCount) === currentPage ? {cursor:"default" }:{cursor:"pointer" }} onClick={() => nextpage()} bgColor={Math.ceil(pageCount) === currentPage ? "blackAlpha.500" : "white"}>＞</Box>
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