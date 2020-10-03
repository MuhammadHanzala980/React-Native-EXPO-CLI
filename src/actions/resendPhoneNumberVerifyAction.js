import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const resendPhoneNumberVerifyType = typeGenerator(
  "PHONE_NUMBER_VERIFICATION"
);

/**
 * This action verifies a user phone number
 * @param {Object} userData - This is the user data to be sent to the API
 */
export const resendPhoneNumberVerifyUser = (userData) => async (dispatch) => {
  dispatch(action(resendPhoneNumberVerifyType.loading, true));
  try {
    const response = await request({
      route: "auth/resend-signup-sms",
      method: "post",
      payload: userData,
    });
    const data = response.data;

    dispatch(action(resendPhoneNumberVerifyType.success, data));
    dispatch(action(resendPhoneNumberVerifyType.loading, false));
  } catch (err) {
    dispatch(action(resendPhoneNumberVerifyType.failure, err.response));
    dispatch(action(resendPhoneNumberVerifyType.loading, false));
  }
};
