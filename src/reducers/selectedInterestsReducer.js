import { selectedInterestsType } from '../actions/selectedInterestsAction';

const initialState = {
  loading: false,
  message: '',
  data: {},
  errors: {},
  status: null,
};

/**
 * @description - interest by categories reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case selectedInterestsType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case selectedInterestsType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data.message,
      };
    case selectedInterestsType.success:
      return {
        ...state,
        loading: action.data,
        message: action.data.message,
        data: action.data,
        errors: '',
      };
    default:
      return state;
  }
};
