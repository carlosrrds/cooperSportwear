"use client";

import React from 'react';
import ProductList from './productList/ProductList';
import FiltersSideBar from './filterSideBar/FiltersSideBar';
import PaginationControls from './paginationControls/PaginationControls';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useProductList } from '../../hooks/useProductList'
import { useSearchParams } from 'next/navigation';

const Showcase = () => {
  const searchParams = useSearchParams();
  const { width } = useWindowSize();

  const { productList, error, isLoading, pagination} = useProductList({filters: searchParams})

  if (isLoading) return <p>isLoading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container-fluid d-flex justify-content-center" style={{ padding: '20px 0' }}>
      <div className="d-flex w-100" style={{ maxWidth: '1440px' }}>
        {width > 768 && (
          <div className="filters-bar me-4" style={{ width: '250px' }}>
            <FiltersSideBar />
          </div>
        )}
        <div className="product-list flex-grow-1">
          <ProductList products={productList} />
          <PaginationControls
            currentPage={pagination.currentPage}
            lastPage={pagination.lastPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Showcase;
