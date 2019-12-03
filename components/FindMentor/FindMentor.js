import React from 'react';
import { Header, SearchBar } from 'react-native-elements';
import {
  Layout,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  ApplicationProvider,
} from 'react-native-ui-kitten';
import MentorCard from './mentorCard';
import OtherDepartments from './OtherDeptView';
import {
  Button,
  Dimensions,
  StyleSheet,
  View,
  ListView,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { SearchIcon, BackIcon, MenuIcon } from '../Utils/customIcons';
import Fire from '../Fire';

// screen for the "Find Mentor" page
export default class FindMentor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yourDepartmentList: [],
      otherDepartmentsList: [],
      viewMode: 'default',
      search: '',
      dataisLoaded: false,
    };
  }

  //splits the data up by whether or not their in your major
  parseMentor = dataList => {
    let data = {};
    let yourdept = [];
    let otherdepts = [];
    dataList.forEach(mentor => {
      //if the department hasn't been found, add it to the object
      if (!(mentor.department in data)) {
        data[mentor.department] = [];
      }

      // adds the mentor to the appropriate department's array
      data[mentor.department].push({
        name: mentor.profile.nameFirst + ' ' + mentor.profile.nameLast,
        position: mentor.profile.experience[0].title,
        company: mentor.profile.experience[0].company,
        grad: mentor.profile.gradClass,
        avatar: mentor.profile.avatar,
      });
    });
    //converts the data to a format that is consistent with the components
    Object.keys(data).forEach(key => {
      if (['Computer Science'].includes(key)) {
        yourdept = data[key];
      } else {
        otherdepts.push({ name: key, members: data[key] });
      }
    });

    this.setState({
      yourDepartmentList: yourdept,
      otherDepartmentsList: otherdepts,
      dataisLoaded: true,
    });
  };

  async componentDidMount() {
    let data = await Fire.shared.pullMentorList(); //querries the database 
    this.parseMentor(data);
  }

  // will open the draer
  OpenMenu = () => (
    <TopNavigationAction
      onPress={() => this.props.navigation.toggleDrawer()}
      icon={MenuIcon}
    />
  );

  // what the navigation bar looks like before the search bar is pressed
  defaultNavigation = () => {
    return (
      <View>
        <View
          style={{
            height: Constants.statusBarHeight,
          }}
        />
        <TopNavigation
          title="Mentors"
          alignment="center"
          rightControls={this.expandSearchBar()}
          leftControl={this.OpenMenu()}
        />
      </View>
    );
  };

  // when pressed, it will change the top navigation to a search bar
  expandSearchBar = () => (
    <TopNavigationAction
      onPress={() => {
        this.setState({
          viewMode: 'search',
        });
      }}
      icon={SearchIcon}
    />
  );

  // lets the back button navigate to the
  backNavigation = () => {
    <TopNavigationAction
      onPress={this.props.navigation.navigate('News Feed')}
      icon={BackIcon}
    />;
  };
  // searches for mentors, soon to be replaced by database query
  updateSearch = searchVal => {
    this.setState({ search: searchVal });
  };

  // defines how the top naviagation looks when the search bar is pressed
  searchBarExpanded = () => {
    return (
      <SearchBar
        ref={search => (this.search = search)}
        platform="ios"
        lightTheme="true"
        round //To make the searchbar corner round (default square)
        searchIcon={{ size: 24 }} //Size of the search icon
        placeholder="Search..."
        containerStyle={{
          backgroundColor: 'white',
          borderWidth: 0,
          borderColor: 'white',
          minWidth: '80%',
          paddingBottom: 10,
        }}
        inputContainerStyle={{
          backgroundColor: '#E7E7E7',
          marginTop: Constants.statusBarHeight,
          minWidth: '78%',
          paddingBottom: 5,
          opacity: 100,
          height: 40,
        }}
        onChangeText={text => this.updateSearch(text)}
        value={this.state.search}
        placeholderTextColor={'#g5g5g5'}
        showCancel="true"
      />
    );
  };

  // will conditionally render what the top navigation looks like
  topNaviagationMode = () => {
    if (this.state.viewMode == 'default') {
      return this.defaultNavigation();
    } else {
      return this.searchBarExpanded();
    }
  };

  /* will navigate to the chat page  (soon to be replaced with navigating 
  to the user's profile )*/
  openChat = name => {
    this.props.navigation.navigate('ChatDM', { name: name });
  };

  render() {
    return (
      <Layout style={{ bottom: 0 }}>
        {this.topNaviagationMode()}
        <Text
          style={{
            fontSize: 20,
            marginLeft: 10,
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          Your Department
        </Text>
        <ScrollView>
          {this.state.yourDepartmentList.map(mentor => {
            return (
              <MentorCard
                date={mentor.date}
                name={mentor.name}
                avatar={mentor.avatar}
                position={mentor.position}
                company={mentor.company}
                openChat={this.openChat}
                grad={mentor.grad}
                backgroundColor="white"
              />
            );
          })}
        </ScrollView>
        {this.state.dataisLoaded ? (
          <OtherDepartments data={this.state.otherDepartmentsList} />
        ) : (
          <View />
        )}
      </Layout>
    );
  }
}