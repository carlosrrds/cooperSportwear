import axios, { AxiosRequestConfig } from 'axios';

const productsAxiosInstance = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    
    const [url, config] = Array.isArray(args) ? args : [args];
  
    const res = await productsAxiosInstance.get(url, { ...config });

  
    return res.data;
  };

export default productsAxiosInstance;