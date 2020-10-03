import { searchAllListingsType } from '../actions/searchAllListingsAction';

const initialState = {
  loading: false,
  message: '',
  data: {},
  errors: {},
  status: null,
  statusText: '',
};

/**
 * @description - search All Listings function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case searchAllListingsType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case searchAllListingsType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data.message,
      };
    case searchAllListingsType.success:
      return {
        ...state,
        loading: action.data,
        message: action.data.data.message,
        data: action.data.data,
        status: action.data.status.code,
        statusText: action.data.status.text,
      };
    default:
      return state;
  }
};
