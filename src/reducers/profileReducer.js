import { profileType } from "../actions/profileAction";

const initialState = {
  loading: false,
  message: "",
  data: {},
  errors: {},
  status: null,
  statusText: "",
};

/**
 * @description - profile reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case profileType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case profileType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data.message,
      };
    case profileType.success:
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
