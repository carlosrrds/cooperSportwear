"use client";

import React, { useCallback, useEffect, useMemo } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePriceMask } from '@/hooks/usePriceMask';

const FiltersSideBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const { value: minPrice, handleChange: handleMinPriceChange, getUnmaskedValue: getMinPriceUnmasked } = usePriceMask();
  const { value: maxPrice, handleChange: handleMaxPriceChange, getUnmaskedValue: getMaxPriceUnmasked } = usePriceMask();

  useEffect(() => {
    const min = Number(searchParams.getAll('min_price') * 100);
    const max = Number(searchParams.getAll('max_price') * 100);
    if (min[0]) handleMinPriceChange({ target: { value: min[0] } });
    if (max[0]) handleMaxPriceChange({ target: { value: max[0] } });
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const selectedSports = sports.filter(sport => formData.getAll(sport.key).includes(sport.value));
    const selectedBrands = brands.filter(brand => formData.getAll(brand.key).includes(brand.value));
    const selectedSizes = sizes.filter(size => formData.getAll(size.key).includes(size.value));
    const selectedPieces = pieces.filter(piece => formData.getAll(piece.key).includes(piece.value));

    const minPriceValue = getMinPriceUnmasked();
    const maxPriceValue = getMaxPriceUnmasked();

    let params = new URLSearchParams(searchParams);

    params = resetFilters(params);

    if (minPriceValue) {
      params.append('min_price', minPriceValue);
    }
    if (maxPriceValue) {
      params.append('max_price', maxPriceValue);
    }

    selectedSports.forEach(sport => params.append(sport.key, sport.value));
    selectedBrands.forEach(brand => params.append(brand.key, brand.value));
    selectedSizes.forEach(size => params.append(size.key, size.value));
    selectedPieces.forEach(piece => params.append(piece.key, piece.value));

    const queryString = decodeURIComponent(params.toString());

    const URL = `/${queryString ? `?${queryString}` : ''}`;

    router.push(URL);
  };

  const handleClearFilters = () => {
    const formElements = document.querySelectorAll('input[type="checkbox"]');
    formElements.forEach((element) => {
      element.checked = false;
    });
    handleMinPriceChange({ target: { value: '0' } });
    handleMaxPriceChange({ target: { value: '0' } });
    router.push('/');
  };

  const sports = useMemo(() => [
    { name: "Futebol", key: "sports[]", value: "futebol" },
    { name: "Basquete", key: "sports[]", value: "basquete" },
    { name: "Vôlei", key: "sports[]", value: "volei" },
    { name: "Tênis", key: "sports[]", value: "tenis" },
    { name: "Corrida", key: "sports[]", value: "corrida" }
  ], []);

  const brands = useMemo(() => [
    { name: "Nike", key: "sellers[]", value: "nike" },
    { name: "Adidas", key: "sellers[]", value: "adidas" },
    { name: "Puma", key: "sellers[]", value: "puma" },
    { name: "Asics", key: "sellers[]", value: "asics" }
  ], []);

  const sizes = useMemo(() => [
    { name: "P", key: "sizes[]", value: "P" },
    { name: "M", key: "sizes[]", value: "M" },
    { name: "G", key: "G", value: "G" },
    { name: "GG", key: "GG", value: "GG" },
    { name: "XG", key: "XG", value: "XG" }
  ], []);

  const pieces = useMemo(() => [
    { name: "Camiseta", key: "types[]", value: "camiseta" },
    { name: "Shorts", key: "types[]", value: "shorts" },
    { name: "Calças", key: "types[]", value: "calcas" },
    { name: "Tênis", key: "types[]", value: "tenis" },
    { name: "Meias", key: "types[]", value: "meias" },
    { name: "Jaquetas", key: "types[]", value: "jaquetas" }
  ], []);

  const resetFilters = useCallback((params) => {
    sports.forEach(sport => params.delete(sport.key));
    brands.forEach(brand => params.delete(brand.key));
    sizes.forEach(size => params.delete(size.key));
    pieces.forEach(piece => params.delete(piece.key));
    params.delete('min_price');
    params.delete('max_price');

    return params;
  }, [sports, brands, sizes, pieces]);

  const isChecked = (key, value) => {
    return searchParams.getAll(key).includes(value);
  };

  return (
    <Card className="filters-bar mb-4" style={{ width: '250px', backgroundColor: '#FFFFFF', color: '#1F1F1F' }}>
      <Card.Body>
        <Button 
          variant="secondary" 
          className="mb-3 w-100" 
          onClick={handleClearFilters}
          style={{ color: '#1F1F1F', backgroundColor: 'transparent' }}
        >
          Limpar Filtros
        </Button>
        <Form onSubmit={handleSubmit}>
          <Card.Title className="text-gold">Preço</Card.Title>
          <Form.Group controlId="minPrice">
            <Form.Label>Preço Mínimo</Form.Label>
            <Form.Control
              type="text"
              name="min"
              value={minPrice}
              onChange={handleMinPriceChange}
              placeholder="R$ 0,00"
              style={{ backgroundColor: '#FFFFFF', color: '#1F1F1F', borderColor: '#1F1F1F' }}
            />
          </Form.Group>
          <Form.Group controlId="maxPrice" className="mt-3">
            <Form.Label>Preço Máximo</Form.Label>
            <Form.Control
              type="text"
              name="max"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              placeholder="R$ 0,00"
              style={{ backgroundColor: '#FFFFFF', color: '#1F1F1F', borderColor: '#1F1F1F' }}
            />
          </Form.Group>

          <hr style={{ borderColor: '#1F1F1F' }} />

          <Card.Title className="text-gold">Esporte</Card.Title>
          <Row>
            {sports.map((sport, index) => (
              <Col xs={6} key={index}>
                <Form.Check 
                  type="checkbox" 
                  label={sport.name} 
                  name={sport.key} 
                  value={sport.value} 
                  defaultChecked={isChecked(sport.key, sport.value)} 
                  style={{ color: '#1F1F1F' }}
                />
              </Col>
            ))}
          </Row>

          <hr style={{ borderColor: '#1F1F1F' }} />

          <Card.Title className="text-gold">Marcas</Card.Title>
          <Row>
            {brands.map((brand, index) => (
              <Col xs={6} key={index}>
                <Form.Check 
                  type="checkbox" 
                  label={brand.name} 
                  name={brand.key} 
                  value={brand.value} 
                  defaultChecked={isChecked(brand.key, brand.value)} 
                  style={{ color: '#1F1F1F' }}
                />
              </Col>
            ))}
          </Row>

          <hr style={{ borderColor: '#1F1F1F' }} />

          <Card.Title className="text-gold">Tamanhos</Card.Title>
          <Row>
            {sizes.map((size, index) => (
              <Col xs={6} key={index}>
                <Form.Check 
                  type="checkbox" 
                  label={size.name} 
                  name={size.key} 
                  value={size.value} 
                  defaultChecked={isChecked(size.key, size.value)} 
                  style={{ color: '#1F1F1F' }}
                />
              </Col>
            ))}
          </Row>

          <hr style={{ borderColor: '#1F1F1F' }} />

          <Card.Title className="text-gold">Peças</Card.Title>
          <Row>
            {pieces.map((piece, index) => (
              <Col xs={6} key={index}>
                <Form.Check 
                  type="checkbox" 
                  label={piece.name} 
                  name={piece.key} 
                  value={piece.value} 
                  defaultChecked={isChecked(piece.key, piece.value)} 
                  style={{ color: '#1F1F1F' }}
                />
              </Col>
            ))}
          </Row>

          <Button 
            type="submit" 
            variant="primary" 
            className="mt-4 w-100" 
            style={{ backgroundColor: '#FFD700', borderColor: '#FFD700', color: '#1F1F1F' }}
          >
            Aplicar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FiltersSideBar;
