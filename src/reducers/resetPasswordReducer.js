import { resetPasswordType } from "../actions/resetPassswordAction";

const initialState = {
  loading: false,
  passwordErrormessage: "",
  data: {},
  errors: {},
  status: null,
  phoneNumber: "",
};

/**
 * @description - forgotPassword reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case resetPasswordType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case resetPasswordType.failure:
      return {
        ...state,
        loading: action.data,
        message: action.data.data.message,
        errors: action.data.data.errors,
        status: action.data.status,
      };
    case resetPasswordType.success:
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
