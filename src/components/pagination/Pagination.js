import React from 'react';
import './pagination.scss';
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination Mpagination'>
        <div className='Mtitle'>Search Results.....</div>
       <div className='MpageNumber'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <div onClick={() => paginate(number)}  className='page-link'>
              {number}
            </div>
          </li>
        ))}
       </div>
      </ul>
    </nav>
  );
};

export default Pagination;
