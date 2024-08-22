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

  const { productList, isLoading, pagination } = useProductList({ filters: searchParams });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="container-fluid d-flex justify-content-center" style={{ padding: '20px 0' }}>
      <div className="d-flex w-100" style={{ maxWidth: '1440px' }}>
        {width > 768 && (
          <div className="filters-bar me-4" style={{ width: '250px' }}>
            <FiltersSideBar />
          </div>
        )}
        {productList.length > 0 ? (
          <div className="product-list flex-grow-1">
            <ProductList products={productList} />
            <PaginationControls
              currentPage={pagination.currentPage || 1}
              lastPage={pagination.lastPage || 1}
            />
          </div>
        ) : (
          <div className="no-products-found flex-grow-1 d-flex justify-content-center align-items-center">
            <p style={{ fontSize: '1.5rem', color: '#555' }}>Nenhum produto encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Showcase;
