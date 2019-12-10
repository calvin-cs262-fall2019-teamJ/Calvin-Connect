import React from 'react';
import {
  Button,
  Icon,
  List,
  ListItem,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from 'react-native-ui-kitten';
import {
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  TouchableHighlight,
} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import PostCard from './PostCard';
import Fire from '../Fire';

class NewsFeed extends React.Component<Props> {
    constructor(props) {
    super(props);
    this.state = {
      postInfo: [
        {
          annonymous: true,
          text: 'Loading',
          userName: 'user',
          timeStamp: Date.now(),
        },
      ],
    };
  }

  async componentDidMount() {
    //alert("poopity")
    let temp = await Fire.shared.PullPosts();

    let temp2 = [];

    temp.map(postData => {
      temp2.push({
        annonymous: postData.anonymous,
        text: postData.text,
        nameLabel: postData.displayName,
        owner: postData.owner,
        timeStamp: postData.timeOfPost,
      });
    });
    this.setState({
      postInfo: temp2,
    });
  }

  profilePress = () => {
    this.props.navigation.navigate('Profile');
  };

  textPress = paramsVal => {
    this.props.navigation.navigate('PostView', { paramsVal });
  };

  OpenMenu = () => (
    <TopNavigationAction
      onPress={() => this.props.navigation.toggleDrawer()}
      icon={this.MenuIcon}
    />
  );

  createPost = () => {
    this.props.navigation.navigate("CreatePost")
  }

  MenuIcon = style => <Icon {...style} name="menu-outline" />;
  AddIcon = style => <Icon {...style} name="plus-outline" />;

  AddConversation = () => (
    <TopNavigationAction
      onPress={() => this.props.navigation.navigate('Search')}
      icon={this.SearchIcon}
    />
  );

  SearchIcon = style => <Icon {...style} name="search-outline" />;

  /* Renders the component*/
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TopNavigation
          title="Home"
          alignment="center"
          leftControl={this.OpenMenu()}
          rightControls={this.AddConversation()}
        />
                <ScrollView style={styles.scrollView}>
          {this.state.postInfo.map(post => {
            return (
              <PostCard
                annonymous={post.annonymous}
                bgcolor="white"
                text={post.text}
                userImageSrc=<Image
                  style={{
                    height: 30,
                    width: 30,
                    marginLeft: 10,
                    borderRadius: 15,
                    borderWidth: 2,
                  }}
                  source={require('./18942381.jpg')}
                />
                userName={post.nameLabel}
                timeStamp={post.timeStamp}
                postNav={this.profilePress}
                postView={params => this.textPress(params)}
              />
            );
          })}
        </ScrollView>
        <Button
          appearance="fill"
          style={{
            position: 'absolute',
            marginTop: Dimensions.get('window').height * 0.89,
            marginLeft: Dimensions.get('window').width * 0.82,
            width: 60,
            height: 60,
            borderRadius: 60,
            backgroundColor: '#FF522D',
            borderColor: '#FF522D',
          }}
          textStyle={{ color: '#FF4821' }}
          onPress={this.createPost}
          icon = {this.AddIcon}
          color = "black"
          />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#EFEFEF',
  },
  scrollView: {
    backgroundColor: '#EFEFEF',
    justifyContent: 'space-between',
    paddingTop: 'flex',
    marginHorizontal: 1,
  },
});

const postText =
  'The quick brown fox jumped over the lazy dog. A pangram, or holoalphabetic sentence, is a sentence that contains every letter of the alphabet at least once.';

export default NewsFeed;
