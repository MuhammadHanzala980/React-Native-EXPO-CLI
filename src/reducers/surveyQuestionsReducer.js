import { surveyQuestionsType } from '../actions/surveyQuestionsAction';

const initialState = {
  loading: false,
  message: '',
  data: {},
  errors: {},
  status: null,
};

/**
 * @description - user survey response reducer function
 * @param {object} [state=initialState] - Initial state to load
 * @param {Function} action - Action to dispatch
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case surveyQuestionsType.loading:
      return {
        ...state,
        loading: action.data,
      };
    case surveyQuestionsType.failure:
      return {
        ...state,
        loading: action.data,
        errors: action.data.data.message,
      };
    case surveyQuestionsType.success:
      return {
        ...state,
        loading: action.data,
        message: action.data.message,
        data: action.data.data,
      };
    default:
      return state;
  }
};
