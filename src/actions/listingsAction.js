import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const ListingsType = typeGenerator("LISTINGS");

/**
 * This action gets all listings and populates the store
 *
 */
export const listings = () => async (dispatch) => {
  dispatch(action(ListingsType.loading, true));
  try {
    const response = await request({
      route: "listings",
    });
    const data = response.data;
    dispatch(action(ListingsType.success, data));
    dispatch(action(ListingsType.loading, false));
  } catch (err) {
    dispatch(action(ListingsType.failure, err.response));
    dispatch(action(ListingsType.loading, false));
  }
};
