import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const selectedInterestsType = typeGenerator("SELECTED_INTERESTS");

/**
 * This action post user seleted ineterest items by categories and populates the store
 *
 */
export const selectedInterestItems = (userData) => async (dispatch) => {
  dispatch(action(selectedInterestsType.loading, true));
  try {
    const response = await request({
      route: "user-interests",
      method: "post",
      payload: userData,
    });
    const data = response.data;

    dispatch(action(selectedInterestsType.success, data));
    dispatch(action(selectedInterestsType.loading, false));
  } catch (err) {
    dispatch(action(selectedInterestsType.failure, err.response));
    dispatch(action(selectedInterestsType.loading, false));
  }
};
