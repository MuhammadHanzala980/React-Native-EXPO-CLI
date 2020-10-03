import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const resetPasswordType = typeGenerator("FORGOT_PASSWORD");

/**
 * This action verifies a user phone number
 * @param {Object} userData - This is the user data to be sent to the API
 */
export const resetPassword = (userData) => async (dispatch) => {
  dispatch(action(resetPasswordType.loading, true));
  try {
    const response = await request({
      route: "password/sms/reset",
      method: "post",
      payload: userData,
    });
    const data = response.data;

    dispatch(action(resetPasswordType.success, data));
    dispatch(action(resetPasswordType.loading, false));
  } catch (err) {
    dispatch(action(resetPasswordType.failure, err.response));
    dispatch(action(resetPasswordType.loading, false));
  }
};
