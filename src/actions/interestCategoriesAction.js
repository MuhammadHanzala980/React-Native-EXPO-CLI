import request from "../utils/request";
import typeGenerator, { action } from "./typeGenerator";

export const interestCategoriesType = typeGenerator("INTEREST_CATEGORIES");

/**
 * This action gets user ineterest categories and populates the store
 *
 */
export const interestCategories = () => async (dispatch) => {
  dispatch(action(interestCategoriesType.loading, true));
  try {
    const response = await request({
      route: "user-interest-categories",
    });
    const data = response.data;
    dispatch(action(interestCategoriesType.success, data));
    dispatch(action(interestCategoriesType.loading, false));
  } catch (err) {
    dispatch(action(interestCategoriesType.failure, err.response));
    dispatch(action(interestCategoriesType.loading, false));
  }
};
