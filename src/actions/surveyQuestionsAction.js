import request from '../utils/request';
import typeGenerator, { action } from './typeGenerator';

export const surveyQuestionsType = typeGenerator('SURVEY');

/**
 * This action gets survey based on user ineterest by categories and populates the store
 *
*/
export const surveyQuestions = userData => async (dispatch) => {
  dispatch(action(surveyQuestionsType.loading, true));
  try {
    const response = await request({
      route: 'surveys',
      params: userData,
    });

    const data = response.data;

    dispatch(action(surveyQuestionsType.success, data));
    dispatch(action(surveyQuestionsType.loading, false));

  } catch (err) {
    dispatch(action(surveyQuestionsType.failure, err.response));
    dispatch(action(surveyQuestionsType.loading, false));
  }
};
