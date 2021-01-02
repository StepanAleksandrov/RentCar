import axios from 'axios';
import {
  FETCH_CARS,
  FILTER_CARS,
  SEND_ORDER,
  FAILED_ORDER,
} from '../actionTypes';

export function fetchCars(city) {
  return async (distpatch) => {
    try {
      const resp = await axios.get('http://localhost:3000/cars/' + city);
      distpatch({ type: FETCH_CARS, payload: resp.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function sendOrder(data) {
  return async (dispatch) => {
    try {
      if (data.creation === 'creation') {
        dispatch({ type: SEND_ORDER, payload: data.creation });
      } else if (data.creation === 'no creation') {
        dispatch({ type: FAILED_ORDER, payload: data.creation });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterCars(payload) {
  return {
    type: FILTER_CARS,
    payload,
  };
}
