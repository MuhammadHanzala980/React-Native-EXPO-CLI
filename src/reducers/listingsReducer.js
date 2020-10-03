import { ListingsType } from "../actions/listingsAction";

const initialState = {
  loading: false,
  message: "",
  data: {},
  errors: {},
  status: null,
  statusText: "",
};

/**
 * @description - interest by categories reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ListingsType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case ListingsType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data.message,
      };
    case ListingsType.success:
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
