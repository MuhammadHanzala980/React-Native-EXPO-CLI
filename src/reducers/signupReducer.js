import { signupType } from '../actions/signupAction';

const initialState = {
  loading: false,
  message: '',
  data: {},
  userData: {},
  errors: {},
  status: null,
  email: '',
  password: '',
  phoneNumber: '',
};

/**
 * @description - Signup reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case signupType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case signupType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data,
        email: action.data.data.errors.email,
        password: action.data.data.errors.password,
        phoneNumber: action.data.data.errors.phone_number,
        status: action.data.status,
      };
    case signupType.saveFormData:
      return {
        ...state,
        loading: action.data,
        userData: action.data,
        error: action.data.errors,
      };
    case signupType.success:
      return {
        ...state,
        loading: action.data,
        message: action.data.message,
        data: action.data,
        password: '',
      };
    default:
      return state;
  }
};
