import axios from 'axios';

const baseUrl = axios.create({
    baseURL: 'localhost:3333/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ""`
    },
});

export default baseUrl;