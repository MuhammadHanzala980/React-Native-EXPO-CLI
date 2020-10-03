import { profileUpdateType } from '../actions/profileUpdateAction';

const initialState = {
  loading: false,
  message: '',
  data: {},
  errors: {},
  status: null,
  statusText: '',
};

/**
 * @description - profile update details reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case profileUpdateType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case profileUpdateType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data.message,
        status: action.data.status.code,
      };
    case profileUpdateType.success:
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
