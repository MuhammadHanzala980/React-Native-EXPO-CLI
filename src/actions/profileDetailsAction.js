import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const profileDetailsType = typeGenerator("PROFILE_DETAILS");

/**
 * This action gets user details and populates the store
 *
 */
export const profileDetails = () => async (dispatch) => {
  dispatch(action(profileDetailsType.loading, true));
  try {
    const response = await request({
      route: "student-profiles/user",
    });

    const data = response.data;

    dispatch(action(profileDetailsType.success, data));
    dispatch(action(profileDetailsType.loading, false));
  } catch (err) {
    dispatch(action(profileDetailsType.failure, err.response));
    dispatch(action(profileDetailsType.loading, false));
  }
};
