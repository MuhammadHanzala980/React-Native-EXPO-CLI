import { phoneNumberVerifyType } from '../actions/phoneNumberVerifyAction';

const initialState = {
  loading: false,
  verificationErrormessage: '',
  errors: {},
  status: null,
  phoneNumber: '',
  successMessage: '',
};

/**
 * @description - phoneNumberVerify reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case phoneNumberVerifyType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case phoneNumberVerifyType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data.errors,
        status: action.data.status,
        verificationErrormessage: action.data.data.message,
      };
    case phoneNumberVerifyType.success:
      return {
        ...state,
        loading: action.data,
        message: action.data.message,
        data: action.data,
        successMessage: action.data.message,
        status: action.data.status.code,
      };
    default:
      return state;
  }
};
