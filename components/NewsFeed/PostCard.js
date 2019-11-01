import * as React from 'react';
import {
  Text,
  Dimensions,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Card } from 'react-native-paper';
import { Button } from 'react-native-ui-kitten';
//import PostHeader from './PostHeader';
/*
 * @author Samuel Zeleke sgz4@students.calvin.edu
 * @version 1.0
 *
 * AssetExample is a resuable component that Contains a card, a text,
 * an image, and a button the inverts the color
 *
 */
export default class PostCard extends React.Component {
  /*Function accepts props from parent component
   *and sets the default states
   *
   *@param props properties accepted at declaration
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userName,
      backgroundC: this.props.bgcolor,
      text: this.props.text,
      imageSrc: this.props.imageSrc,
      imageUserPhotoSrc: this.props.userImageSrc,
      likeTally: 0,
      buttonTitle: 'Like',
      buttonStatus: 'primary',
    };
  }

  /*Function inverts the colors of the items in components with-in the
   *the AssetExample component
   *
   *@param
   */
  increaseLike = () => {
    if (this.state.buttonTitle == 'Like') {
      this.setState({
        likeTally: this.state.likeTally + 1,
        buttonTitle: 'Liked',
        buttonStatus: 'success',
      });
      alert('Liked ' + this.state.likeTally + ' times');
    } else {
      this.setState({
        likeTally: this.state.likeTally - 1,
        buttonTitle: 'Like',
        buttonStatus: 'primary',
      });
      alert('Liked ' + this.state.likeTally + ' times');
    }
  };

  /* Renders the component*/
  render() {
    return (
      //Card containing sub-components
      <Card
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 8,
          marginLeft: 2,
          marginRight: 2,
          width: Dimensions.get('window').width - 15,
          maxHeight: '800px',
        }}>
        {/*main view*/}
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            maxWidth: Dimensions.get('window').width - 25,
            flex: 1,
            flexDirection: 'col',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingBottom: 10,
            }}>
            <TouchableHighlight
              onPress={() => {
                this.props.navigation.navigate('Profile');
              }}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 10,
                  borderRadius: 15,
                  borderWidth: 2,
                }}
                source={require('../../assets/kvlinden1.png')}
              />
            </TouchableHighlight>
            {/*Name sub-component*/}
            <Text
              style={{
                marginLeft: 10,
                marginTop: 8,
                fontSize: 13,
                textAlign: 'left',
              }}>
              {this.props.userName} • {this.props.timeStamp}
            </Text>
          </View>
          <TouchableHighlight
            onPress={() => {
              alert("Hi! I'm the text");
            }}>
            <Text
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 2,
                fontSize: 14,
                textAlign: 'left',
              }}
              numberOfLines={5}>
              {this.props.text}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              alert("Hi! I'm the image");
            }}>
            <Image
              style={{
                width: Dimensions.get('window').width - 25,
                margin: 5,
              }}
              source={require('./quick-brown-fox-18.jpg')}
            />
          </TouchableHighlight>
        </View>
      </Card>
    );
  }
}
