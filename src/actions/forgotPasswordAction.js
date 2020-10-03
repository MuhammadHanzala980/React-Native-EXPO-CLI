import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const forgotPasswordType = typeGenerator("FORGOT_PASSWORD");

/**
 * This action sends SMS code for reseting password
 * @param {Object} userData - This is the user data to be sent to the API
 */
export const forgotPassword = (userData) => async (dispatch) => {
  dispatch(action(forgotPasswordType.loading, true));
  try {
    const response = await request({
      route: "password/sms/create",
      method: "post",
      payload: userData,
    });
    const data = response.data;

    dispatch(action(forgotPasswordType.success, data));
    dispatch(action(forgotPasswordType.loading, false));
  } catch (err) {
    dispatch(action(forgotPasswordType.failure, err.response));
    dispatch(action(forgotPasswordType.loading, false));
  }
};
