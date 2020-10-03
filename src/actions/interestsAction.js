import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const interestsType = typeGenerator("INTERESTS");

/**
 * This action gets user ineterest by categories and populates the store
 *
 */
export const interests = (userData) => async (dispatch) => {
  dispatch(action(interestsType.loading, true));
  try {
    const response = await request({
      route: "interests/categories",
      method: "post",
      payload: userData,
    });
    const data = response.data;
    dispatch(action(interestsType.success, data));
    dispatch(action(interestsType.loading, false));
  } catch (err) {
    dispatch(action(interestsType.failure, err.response));
    dispatch(action(interestsType.loading, false));
  }
};
