import { combineReducers } from 'redux';

// reducers
import signupReducer from '../reducers/signupReducer';
import loginReducer from '../reducers/loginReducer';
import phoneNumberVerifyReducer from '../reducers/phoneNumberVerifyReducer';
import resendPhoneNumberVerifyReducer from '../reducers/resendPhoneNumberVerifyReducer';
import forgotPasswordReducer from '../reducers/forgotPasswordReducer';
import resetPasswordReducer from '../reducers/resetPasswordReducer';
import interestCategoriesReducer from './interestCategoriesReducer';
import interestsReducer from './interestsReducer';
import listingsReducer from './listingsReducer';
import surveyQuestionsReducer from './surveyQuestionsReducer';
import surveyReducer from './surveyReducer';
import selectedInterestsReducer from './selectedInterestsReducer';
import searchAllListingReducer from './SearchAllListingsReducer';
import educationListingsReducer from './educationListingsReducer';
import employmentListingsReducer from './employmentListingsReducer';
import mentorshipListingsReducer from './mentorshipListingReducer';
import profileReducer from './profileReducer';
import profileDetailsReducer from './profileDetailsReducer';
import profileUpdateReducer from './profileUpdateReducer';

/**
 * @function combineReducers - the redux store combineReducers function
*/

export default combineReducers({
  signupReducer,
  phoneNumberVerifyReducer,
  resendPhoneNumberVerifyReducer,
  loginReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  interestCategoriesReducer,
  interestsReducer,
  listingsReducer,
  surveyQuestionsReducer,
  surveyReducer,
  searchAllListingReducer,
  educationListingsReducer,
  employmentListingsReducer,
  mentorshipListingsReducer,
  selectedInterestsReducer,
  profileReducer,
  profileDetailsReducer,
  profileUpdateReducer,
});
