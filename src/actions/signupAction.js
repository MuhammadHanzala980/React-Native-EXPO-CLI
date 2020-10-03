import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const signupType = typeGenerator("SIGNUP");

export const saveInfo = (userData) => (dispatch) => {
  dispatch(action(signupType.loading, true));
  dispatch(action(signupType.saveFormData, userData));
  dispatch(action(signupType.loading, false));
};

/**
 * This action signs up a user and populates the store
 * @param {Object} userData - This is the user data to be sent to the API
 */
export const signUpUser = (userData) => async (dispatch) => {
  dispatch(action(signupType.loading, true));
  try {
    const response = await request({
      route: "auth/signup",
      method: "post",
      payload: userData,
    });
    const data = response.data;
    dispatch(action(signupType.success, data));
    dispatch(action(signupType.loading, false));
  } catch (err) {
    dispatch(action(signupType.failure, err.response));
    dispatch(action(signupType.loading, false));
  }
};
