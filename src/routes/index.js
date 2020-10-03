import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Icon } from 'native-base';
import Onboarding from '../components/onboarding/onboarding';
import Welcome from '../components/Welcome';
import SignupName from '../components/SignupName';
import SignupGrade from '../components/SignupGrade';
import SignupBirthDate from '../components/SignupBirthDate';
import SignupZipcode from '../components/SignupZipcode';
import SignupSchool from '../components/SignupSchool';
import SignupPhoneNumber from '../components/SignupPhoneNumber';
import SignupEmail from '../components/SignupEmail';
import Login from '../components/Login';
import CreatePassword from '../components/CreatePassword';
import ForgotPassword from '../components/ForgotPassword';
import ForgotPasswordLinkSent from '../components/ForgotPasswordLinkSent';
import InterestCategories from '../components/InterestCategories';
import Interests from '../components/Interests';
import Home from '../components/Home';
import Listings from '../components/Listings';
import EducationListings from '../components/EducationListings';
import EmploymentListings from '../components/EmploymentListings';
import MentorshipListings from '../components/MentorshipListings';
import FavoritedListings from '../components/FavoritedListings';
import PhoneNumberVerify from '../components/PhoneNumberVerify';
import ResendPhoneNumberVerify from '../components/ResendPhoneNumberVerify';
import ResetPassword from '../components/ResetPassword';
import Survey from '../components/Survey';
import SurveyCompleted from '../components/SurveryCompleted';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import ListingDetails from '../components/ListingDetails';
import MomentumBucks from '../components/MomentumBucks';
import AppFirstLaunch from '../components/AppFirstLaunch';

const generalConfig = {
  headerMode: 'none',
};

const OnboardingStack = createStackNavigator({
  Onboarding,
}, {
  ...generalConfig,
});

const HomeStack = createStackNavigator({
  Home,
}, {
  ...generalConfig,
});

const ListingStack = createStackNavigator({
  Listings,
  EducationListings,
  EmploymentListings,
  MentorshipListings,
  FavoritedListings,
}, {
  ...generalConfig,
});

const ProfileStack = createStackNavigator({
  Profile,
  EditProfile,
}, {
  ...generalConfig,
});

const TabScreens = createBottomTabNavigator({
  HomeTab: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  ListingsTab: {
    screen: ListingStack,
    navigationOptions: {
      tabBarLabel: 'Search',
    },
  },
  ProfileTab: {
    screen: ProfileStack,
  },
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName, type;
        if (routeName === 'HomeTab') {
          type = 'Entypo';
          iconName = 'home';
        } else if (routeName === 'ListingsTab'){
          type = 'FontAwesome5';
          iconName = 'search';
        } else if (routeName === 'ProfileTab') {
          type = 'FontAwesome5';
          iconName = 'user-alt';
        }
        return <IconComponent type={type} name={iconName}  style={{color: tintColor, fontSize: RFPercentage(3.5)}} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FFD495',
      inactiveTintColor: '#FFFFFF',
      showIcon: true ,
      showLabel: false,
      style: {
        height: hp(8),
        backgroundColor: '#1B62CC',
        borderRadius: 50,
        width: '98%',
        alignSelf: 'center',
      },
    },
  }
);

const SignupStack = createStackNavigator({
  SignupName,
  SignupSchool,
  SignupGrade,
  SignupBirthDate,
  SignupPhoneNumber,
  SignupZipcode,
  SignupEmail,
  CreatePassword,
  PhoneNumberVerify,
  ResendPhoneNumberVerify,
}, {
  ...generalConfig,
});

const AppStack = createStackNavigator({
  AppFirstLaunch,
  Onboarding: OnboardingStack,
  Welcome,
  SignupStack,
  Login,
  ForgotPassword,
  ResetPassword,
  ForgotPasswordLinkSent,
  InterestCategories,
  Interests,
  Survey,
  SurveyCompleted,
  TabScreens,
  ListingDetails,
  MomentumBucks,
}, {
    headerMode: 'none',
  });

const App = createAppContainer(AppStack);
export default App;
