import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const searchAllListingsType = typeGenerator("SEARCH_ALL_LISTINGS");

/**
 * This action gets all listings search and populates the store
 *
 */
export const searchAllListings = (userData) => async (dispatch) => {
  dispatch(action(searchAllListingsType.loading, true));
  try {
    const response = await request({
      route: "listings/search",
      method: "post",
      payload: userData,
    });
    const data = response.data;

    dispatch(action(searchAllListingsType.success, data));
    dispatch(action(searchAllListingsType.loading, false));
  } catch (err) {
    dispatch(action(searchAllListingsType.failure, err.response));
    dispatch(action(searchAllListingsType.loading, false));
  }
};
