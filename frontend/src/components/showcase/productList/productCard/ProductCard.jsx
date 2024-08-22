"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ProductDetailsModal from './ProductDetailsModal';

const ProductCard = ({ product }) => {
  const { image_url, name, price, details } = product;
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div
        className="card text-center"
        style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
        onClick={handleShowModal}
      >
        <div className="card-img-top d-flex justify-content-center align-items-center" style={{ overflow: 'hidden' }}>
          <Image
            src={image_url}
            width={500}
            height={200}
            alt={name}
            style={{
              borderRadius: '8px',
              objectFit: 'cover',
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between" style={{ flexGrow: 1 }}>
          <h5
            className="card-title"
            style={{ color: '#333', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}
          >
            {name}
          </h5>
          <p className="card-text" style={{ color: '#000', fontSize: '18px', fontWeight: 'bold' }}>
            R$ {price.toFixed(2)}
          </p>
          <p
            className="card-details text-muted"
            style={{
              fontSize: '14px',
              marginTop: '10px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              maxHeight: '60px',
            }}
          >
            {details}
          </p>
        </div>
      </div>

      <ProductDetailsModal
        show={showModal}
        handleClose={handleCloseModal}
        product={product}
      />
    </>
  );
};

export default ProductCard;
