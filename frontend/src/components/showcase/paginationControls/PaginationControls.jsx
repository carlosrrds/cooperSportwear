import { handleFilters } from '@/utils/handleFilters';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const PaginationControls = ({ currentPage, lastPage }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pages = [...Array(lastPage).keys()].map((num) => num + 1);

  const onPageClick = (page) => {
    const newRoute = handleFilters({filters: searchParams, name: "page", value: page, route: '/'})
    router.push(newRoute)
  }

  const onPreviousPage = () => {
    const page = currentPage - 1
    const newRoute = handleFilters({filters: searchParams, name: "page", value: page, route: '/'})
    router.push(newRoute)
  }

  const onNextPage = () => {
    const page = currentPage + 1
    const newRoute = handleFilters({filters: searchParams, name: "page", value: page, route: '/'})
    router.push(newRoute)
  }

  return (
    <div className="pagination-controls mt-4 d-flex justify-content-center align-items-center">
      {currentPage > 1 && (
        <button
          className="btn btn-outline-dark me-2"
          onClick={onPreviousPage}
        >
          &lt;
        </button>
      )}
      <div className="d-flex">
        {pages.map((page) => (
          <button
            key={page}
            className={`btn ${page === currentPage ? 'btn-dark' : 'btn-outline-dark'} mx-1`}
            onClick={() => onPageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>
      {currentPage < lastPage && (
        <button
          className="btn btn-outline-dark ms-2"
          onClick={onNextPage}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default PaginationControls;
