import { forgotPasswordType } from '../actions/forgotPasswordAction';

const initialState = {
  loading: false,
  passwordErrormessage: '',
  data: {},
  errors: {},
  status: null,
  phoneNumber: '',
};

/**
 * @description - forgotPassword reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case forgotPasswordType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case forgotPasswordType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data.errors,
        status: action.data.status,
      };
    case forgotPasswordType.success:
      return {
        ...state,
        loading: action.data,
        message: action.data.message,
        data: action.data,
        status: action.data.status.code,
      };
    default:
      return state;
  }
};
