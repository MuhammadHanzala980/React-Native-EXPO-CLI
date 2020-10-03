import { surveyType } from '../actions/surveyAction';

const initialState = {
  loading: false,
  message: '',
  data: {},
  errors: {},
  status: null,
};

/**
 * @description - post user survey by interest reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case surveyType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case surveyType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data.message,
      };
    case surveyType.success:
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
