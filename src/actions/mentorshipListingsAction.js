import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const mentorshipListingsType = typeGenerator("MENTORSHIP_LISTINGS");

/**
 * This action gets mentorshp listings and populates the store
 *
 */
export const mentorshipListings = () => async (dispatch) => {
  dispatch(action(mentorshipListingsType.loading, true));
  try {
    const response = await request({
      route: "listings/bucket/Mentorship",
    });
    const data = response.data;

    dispatch(action(mentorshipListingsType.success, data));
    dispatch(action(mentorshipListingsType.loading, false));
  } catch (err) {
    dispatch(action(mentorshipListingsType.failure, err.response));
    dispatch(action(mentorshipListingsType.loading, false));
  }
};
