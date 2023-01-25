import axios from 'axios';

const config = {
    baseURL: 'https://jsonplaceholder.typicode.com/',
};

const request = axios.create(config);

// TODO
export enum Endpoints {
    sendMessage = 'url',
}

export default request;
