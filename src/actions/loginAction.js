import AsyncStorage from "@react-native-community/async-storage";
import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const loginType = typeGenerator("LOGIN");

/**
 * This action login a user and populates the store
 * @param {Object} userData - This is the user data to be sent to the API
 */
export const loginUser = (userData) => async (dispatch) => {
  dispatch(action(loginType.loading, true));
  try {
    const response = await request({
      route: "auth/login",
      method: "post",
      payload: userData,
    });
    const data = response.data;
    const token = data.data.access_token;
    await AsyncStorage.setItem("token", token);
    dispatch(action(loginType.success, data));
    dispatch(action(loginType.loading, false));
  } catch (err) {
    dispatch(action(loginType.failure, err.response));
    dispatch(action(loginType.loading, false));
  }
};
