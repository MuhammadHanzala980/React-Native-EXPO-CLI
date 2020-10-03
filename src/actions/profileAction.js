import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const profileType = typeGenerator("PROFILE");

/**
 * This action gets user details and populates the store
 *
 */
export const profile = () => async (dispatch) => {
  dispatch(action(profileType.loading, true));
  try {
    const response = await request({
      route: "student-profiles/user",
    });

    const data = response.data;

    dispatch(action(profileType.success, data));
    dispatch(action(profileType.loading, false));
  } catch (err) {
    dispatch(action(profileType.failure, err.response));
    dispatch(action(profileType.loading, false));
  }
};
