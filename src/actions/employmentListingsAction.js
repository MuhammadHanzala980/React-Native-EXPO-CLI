import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const employmentListingsType = typeGenerator("EMPLOYMENT_LISTINGS");

/**
 * This action gets employment listings and populates the store
 *
 */
export const employmentListings = () => async (dispatch) => {
  dispatch(action(employmentListingsType.loading, true));
  try {
    const response = await request({
      route: "listings/bucket/Employment",
    });
    const data = response.data;

    dispatch(action(employmentListingsType.success, data));
    dispatch(action(employmentListingsType.loading, false));
  } catch (err) {
    dispatch(action(employmentListingsType.failure, err.response));
    dispatch(action(employmentListingsType.loading, false));
  }
};
