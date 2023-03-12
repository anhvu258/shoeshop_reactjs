import {API_URL} from '../utils/config'
import authHeader from './auth-header'

const getAllSales = () => {
    return fetch(API_URL + "getAllSales", {
      method: "GET",
      mode: "cors",
      headers: authHeader(),
      
      })
      .then((res) => res.json())
      .then((json) => {
        console.log('goi api get all sale');
        return json;
      });
  };
  // eslint-disable-next-line import/no-anonymous-default-export
  export default {
    getAllSales
  };