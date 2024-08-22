import { handleFilters } from '@/utils/handleFilters';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        const newRoute = handleFilters({ filters: searchParams, name: "search", value: searchTerm.trim(), route: '/' });
        router.push(newRoute);
      } else{
        const newRoute = handleFilters({ filters: searchParams, name: "search", value: false, route: '/' });
        router.push(newRoute);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchParams, router]);

  return (
    <form
      className="d-flex mx-auto"
      style={{
        ...(typeof window !== 'undefined' && window.innerWidth > 786
          ? { width: '50%' }
          : { width: '95%' }),
      }}
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Pesquise por nome, marca, esporte..."
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
