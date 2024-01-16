import axios from 'axios';

export default axios.create({
    baseURL: process.env.SERVICE_URL,
})