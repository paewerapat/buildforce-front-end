import axios from "axios";

const GRAPHQL_TOKEN = process.env.GRAPHQL_TOKEN;
const GRAPHQL_URL = process.env.GRAPHQL_URL;
const APP_URL = process.env.APP_URL;

export default axios.create({
    baseURL: APP_URL,
    headers: {
        "Content-Type": "application/json",
        'Apollo-Require-Preflight': 'true'
    }
})

export const axiosQL = axios.create({
    baseURL: GRAPHQL_URL,
    headers: {
        "Content-Type": "application/json",
        'Apollo-Require-Preflight': 'true',
        "Authorization": GRAPHQL_TOKEN
    }
})