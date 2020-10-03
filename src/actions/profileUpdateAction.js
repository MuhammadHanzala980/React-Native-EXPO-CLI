import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const profileUpdateType = typeGenerator("PROFILE_UPDATE");

/**
 * This action updates user profile details and populates the store
 *
 */
export const profileUpdate = (userData) => async (dispatch) => {
  dispatch(action(profileUpdateType.loading, true));
  try {
    const response = await request({
      route: "student-profiles",
      method: "patch",
      payload: userData,
    });

    const data = response.data;

    dispatch(action(profileUpdateType.success, data));
    dispatch(action(profileUpdateType.loading, false));
  } catch (err) {
    dispatch(action(profileUpdateType.failure, err.response));
    dispatch(action(profileUpdateType.loading, false));
  }
};
