import { resendPhoneNumberVerifyType } from '../actions/resendPhoneNumberVerifyAction';

const initialState = {
  loading: false,
  passwordErrormessage: '',
  data: {},
  errors: {},
  status: null,
  phoneNumber: '',
};

/**
 * @description - resendPhoneNumberVerify reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case resendPhoneNumberVerifyType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case resendPhoneNumberVerifyType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data.errors,
        status: action.data.status,
        passwordErrormessage: action.data.data.message,
      };
    case resendPhoneNumberVerifyType.success:
      return {
        ...state,
        loading: action.data,
        message: action.data.message,
        data: action.data,
      };
    default:
      return state;
  }
};
