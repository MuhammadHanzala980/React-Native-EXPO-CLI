import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const surveyType = typeGenerator("SURVEY");

/**
 * This action post user survey response based on user ineterest by categories and populates the store
 *
 */
export const survey = (userData) => async (dispatch) => {
  dispatch(action(surveyType.loading, true));
  try {
    const response = await request({
      route: "survey-responses",
      method: "post",
      payload: userData,
    });
    const data = response.data;
    dispatch(action(surveyType.success, data));
    dispatch(action(surveyType.loading, false));
  } catch (err) {
    dispatch(action(surveyType.failure, err.response));
    dispatch(action(surveyType.loading, false));
  }
};
