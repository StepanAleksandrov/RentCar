import {
  FETCH_CARS,
  FILTER_CARS,
  SEND_ORDER,
  FAILED_ORDER,
} from '../actionTypes';

let initialState = {
  cars: [],
  filterItem: [],
  loading: true,
  creation: '',
};

export const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARS:
      return {
        ...state,
        cars: action.payload,
        filterItem: action.payload,
        loading: false,
      };

    case FILTER_CARS:
      return {
        ...state,
        filterItem: action.payload,
      };
    case SEND_ORDER:
      return {
        ...state,
        creation: action.payload,
      };
    case FAILED_ORDER:
      return {
        ...state,
        creation: action.payload,
      };

    default:
      return state;
  }
};
