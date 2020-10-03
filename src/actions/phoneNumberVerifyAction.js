import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const phoneNumberVerifyType = typeGenerator("PHONE_NUMBER_VERIFICATION");

/**
 * This action verifies a user phone number
 * @param {Object} userData - This is the user data to be sent to the API
 */
export const phoneNumberVerifyUser = (userData) => async (dispatch) => {
  dispatch(action(phoneNumberVerifyType.loading, true));
  try {
    const response = await request({
      route: "auth/signup/phone/activate",
      method: "post",
      payload: userData,
    });
    const data = response.data;
    dispatch(action(phoneNumberVerifyType.success, data));
    dispatch(action(phoneNumberVerifyType.loading, false));
  } catch (err) {
    dispatch(action(phoneNumberVerifyType.failure, err.response));
    dispatch(action(phoneNumberVerifyType.loading, false));
  }
};
