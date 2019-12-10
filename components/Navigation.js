import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { ChatStack, LoginStack, SettingsStack, NewsFeedStack } from './SubStacks';
import { Navigation } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';


// Import the screens
import TabBarComponent from './TabBarComponent/TabBarComponent';
import Profile from './Profile/Profile';
import NewsFeed from './NewsFeed/NewsFeed';
import FindMentor from './FindMentor/FindMentor';
import Search from './Search/Search';

export const TabNavigator = createBottomTabNavigator(
  {
    Profile: Profile,
    "Find a Mentor": FindMentor,
    "News Feed": NewsFeedStack,
    Chat: ChatStack,
    Settings: SettingsStack,
    
  },
  {
    tabBarComponent: TabBarComponent,
  }
);

export const mainNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
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
