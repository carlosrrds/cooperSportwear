import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';  
import Image from 'next/image';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  
  return windowSize;
};

const ProductDetailsModal = ({ show, handleClose, product }) => {
  const { width, height } = useWindowSize();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(0);

  if (!product) return null;

  const { image_url, name, details, available_sizes } = product;

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const isMobile = width <= 900;

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: isMobile ? '20px' : '32px' }}>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column flex-md-row align-items-center" style={{ height: 'calc(100% - 56px)' }}>
        <div className="d-flex justify-content-center align-items-center w-100 w-md-50 mb-4 mb-md-0">
          <Image 
            src={image_url} 
            width={isMobile ? 400 : 700} 
            height={isMobile ? 400 : 700} 
            alt={name} 
            style={{ objectFit: 'contain', maxWidth: '100%', minWidth: '320px'}} 
          />
        </div>
        <div className="product-details w-100 w-md-50 pl-md-4 d-flex flex-column justify-content-center m-3" style={{ overflowY: 'auto', height: '100%' }}>
        <p><strong>Descrição:</strong></p>
          <div className="mb-3">
            <p style={{ fontSize: isMobile ? '12px' : '18px', color: '#000', marginBottom: '8px' }}>{details}</p>
          </div>
          <div className="sizes mb-3">
            <p><strong>Selecione o tamanho:</strong></p>
            <div className="d-flex flex-wrap">
              {available_sizes && available_sizes.length > 0 ? (
                available_sizes.map((size, index) => (
                  <Button
                    key={index}
                    variant={selectedSize === size ? "dark" : "outline-dark"}
                    onClick={() => handleSizeSelect(size)}
                    className="m-1"
                    style={{
                      minWidth: isMobile ? '40px' : '60px',
                      padding: isMobile ? '8px' : '12px',
                      textAlign: 'center',
                      fontSize: isMobile ? '12px' : '16px',
                    }}
                  >
                    {size}
                  </Button>
                ))
              ) : (
                <p>tamanho único</p>
              )}
            </div>
          </div>
          <div className="quantity d-flex align-items-center mb-3">
            <p className="mb-0 mr-2"><strong>Quantidade:</strong></p>
            <div className="d-flex align-items-center m-2">
              <Button variant="outline-dark" className="px-2 m-2" onClick={handleDecrement} style={{ fontSize: isMobile ? '12px' : '16px' }}>-</Button>
              <Form.Control 
                type="number" 
                value={quantity} 
                readOnly 
                className="text-center m-2" 
                style={{ width: isMobile ? '50px' : '70px', padding: '5px 10px', height: 'auto', fontSize: isMobile ? '12px' : '16px' }} 
              />
              <Button variant="outline-dark" className="px-2 m-2" onClick={handleIncrement} style={{ fontSize: isMobile ? '12px' : '16px' }}>+</Button>
            </div>
          </div>
          <Button variant="dark" className="w-100" style={{ maxWidth: '300px', fontSize: isMobile ? '14px' : '18px' }}>
            Adicionar ao carrinho
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductDetailsModal;
