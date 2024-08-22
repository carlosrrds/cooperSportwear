import { useState, ChangeEvent } from 'react';

export const usePriceMask = (initialValue: string = '') => {
  const [value, setValue] = useState<string>(initialValue);

  const formatPrice = (value: string): string => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = (parseFloat(cleanedValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formattedValue;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setValue(formatPrice(value));
  };

  const getUnmaskedValue = (): number => {
    return parseFloat(value.replace(/[R$.\s]/g, '').replace(',', '.'));
  };

  return {
    value,
    setValue,
    handleChange,
    getUnmaskedValue,
  };
};
