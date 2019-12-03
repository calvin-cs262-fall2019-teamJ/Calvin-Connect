import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { ChatStack, LoginStack, SettingsStack, NewsFeedStack } from './SubStacks';
import { Navigation } from 'react-navigation';

// Import the screens
import DrawerNav from './DrawerNav/DrawerNav';
import Profile from './Profile/Profile';
import NewsFeed from './NewsFeed/NewsFeed';
import FindMentor from './FindMentor/FindMentor';
import Search from './Search/Search';

export const DrawerNavigator = createDrawerNavigator(
  {
    "News Feed": NewsFeedStack,
    Chat: ChatStack,
    "Find a Mentor": {
      screen: FindMentor,
      navigationOptions: {
        header: null,
      },
    },
    Settings: SettingsStack,
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: false,
      },
    },
  },
  {
    contentComponent: DrawerNav,
  }
);

export const mainNavigator = createStackNavigator({
  Home: {
    screen: DrawerNavigator,
    navigationOptions: {
      header: null,
      headerLeft: null,
      gesturesEnabled: false,
    },
  },
  LoginProcess: { screen: LoginStack },
  
  Search: {
    screen: Search,
    navigationOptions: {
      header: null,
    },
  },
});