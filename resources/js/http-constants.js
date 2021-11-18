import axios from 'axios'

let baseURL;

export const HTTP = axios.create(
  {
    baseURL: baseURL
  })
