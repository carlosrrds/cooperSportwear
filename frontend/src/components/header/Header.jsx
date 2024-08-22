"use client";

import { TiShoppingCart } from 'react-icons/ti';
import Logo from './logo/Logo';
import SearchBar from './searchBar/SearchBar';
import { useWindowSize } from '../../hooks/useWindowSize';

const Header = () => {
  const { width } = useWindowSize();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100px', width: '100%', backgroundColor: '#151414' }}>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          maxWidth: '1320px',
          width: '90%',
          maxHeight: '100px',
        }}
      >
        <Logo />
        {width > 768 && (
             <SearchBar className="w-100 w-md-auto my-2 my-md-0" />
        )}
        <button
          className="btn btn-outline-light d-flex justify-content-between align-items-center"
          style={{ width: '110px', padding: '10px', fontSize: '16px', fontWeight: '400', borderRadius: '5px' }}
        >
          <TiShoppingCart className="me-2" />
          Carrinho
        </button>
      </div>
      {width <= 768 && (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            width: '100%',
            height: '45px',
          }}
        >
          <SearchBar className="w-100 w-md-auto my-2 my-md-0" />
        </div>
        )}
    </div>
  );
};

export default Header;