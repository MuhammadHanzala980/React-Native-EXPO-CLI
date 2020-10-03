import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const educationListingsType = typeGenerator("EDUCATION_LISTINGS");

/**
 * This action gets education listings and populates the store
 *
 */
export const educationListings = () => async (dispatch) => {
  dispatch(action(educationListingsType.loading, true));
  try {
    const response = await request({
      route: "listings/bucket/Education",
    });
    const data = response.data;

    dispatch(action(educationListingsType.success, data));
    dispatch(action(educationListingsType.loading, false));
  } catch (err) {
    dispatch(action(educationListingsType.failure, err.response));
    dispatch(action(educationListingsType.loading, false));
  }
};
