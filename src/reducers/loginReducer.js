import { loginType } from '../actions/loginAction';

const initialState = {
  loading: false,
  message: '',
  passwordErrormessage: '',
  data: {},
  errors: {},
  status: null,
  phoneNumber: '',
};

/**
 * @description - login reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case loginType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case loginType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data.errors,
        status: action.data.status,
        passwordErrormessage: action.data.data.message,
      };
    case loginType.success:
      return {
        ...state,
        loading: action.data,
        message: action.data.message,
        data: action.data.data,
        status: action.data.status.code,
        passwordErrormessage: '',
      };
    default:
      return state;
  }
};
