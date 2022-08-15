import React from 'react';
import './Pagination.styles.js';
import { PaginationRow, Paginator } from './Pagination.styles.js';

const PaginationArea = () => {
  return (
    <PaginationRow>
      <Paginator color="secondary" count={12} showFirstButton showLastButton />
    </PaginationRow>
  );
};

export default PaginationArea;
