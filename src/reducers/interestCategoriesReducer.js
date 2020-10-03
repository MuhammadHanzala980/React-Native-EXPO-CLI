import { interestCategoriesType } from '../actions/interestCategoriesAction';

const initialState = {
  loading: false,
  message: '',
  data: {},
  errors: {},
  status: null,
};

/**
 * @description - interest categories reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case interestCategoriesType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case interestCategoriesType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data.message,
        status: action.data.data.status.code,
      };
    case interestCategoriesType.success:
      return {
        ...state,
        loading: action.data,
        message: action.data.message,
        data: action.data.data,
        status: action.data.status.code,
      };
    default:
      return state;
  }
};
