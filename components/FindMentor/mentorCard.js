import React from 'react';
import { Header } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Avatar,
  Layout,
  Button,
  Modal,
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  ApplicationProvider,
  ViewPager as Viewer1,
} from 'react-native-ui-kitten';

export default class MentorCard extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      addIcon: "person-add-outline"
    }
  }

  addPersonIcon = (style) => <Icon {...style} name= {this.state.addIcon} />;
  addPerson = () =>{
    if (this.state.addIcon == "person-add-outline"){
    alert("Mentorship request sent")
    this.setState({
      addIcon: "checkmark-outline"
    })}
    else {
      alert("Mentorship request cancelled")
      this.setState({
      addIcon: "person-add-outline"
    })
    }
  }
  renderModalElement = () => {
    return (
      <Layout
        level='3'
        style={styles.modalContainer}>
        <Text>This is modal</Text>
        <Button onPress={this.setModalVisible}>Hide Modal</Button>
      </Layout>
    );
  };

  render() {
    return (
      <Layout
        style={{
          marginLeft: 5,
          marginRight: 5,
          marginTop: 10,
          height: 50,
          overflow: 'hidden',
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: '#E4E4E4',
          borderBottomWidth: 1,
          backgroundColor: this.props.backgroundColor
        }}>
        <Avatar
          style={styles.avatar}
          size="medium"
          source={{ uri: this.props.avatar }}
        />
        <Layout
          style={{
            flex: 1,
            flexDirection: 'col',
            flexGap: 0,
            height: 38,
            backgroundColor: this.props.backgroundColor,
          }}>
          <Layout
            style={{
              flex: 1,
              flexDirection: 'row',
              marginBottom: 0,
              paddingBottom: 0,
              height: 15,
              backgroundColor: this.props.backgroundColor,
            }}>
            <Text style={styles.name}> {this.props.name} </Text>
            <Text style={styles.gradStyle}> Class of {this.props.grad} </Text>
          </Layout>
          <Text style={styles.position}>
            {this.props.position} • {this.props.company}
          </Text>
        </Layout>
        <Button
          appearance="ghost"
          icon={this.addPersonIcon}
          style={styles.button}
          onPress={() => this.addPerson()}
        />
      </Layout>
      
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    margin: 5,
    width: 40,
    marginRight: 12,
    marginBottom: 10,
  },
  name: {
    color: '#5F1100',
    fontSize: 15,
  },
  position: {
    marginTop: 0,
    paddingTop: 0,
    marginVertical: 0,
    marginRight: 'auto',
    fontSize: 11,
    color: '#888888',
  },
  gradStyle: {
    marginTop: 0,
    marginRight: 'auto',
    fontSize: 10,
    color: '#888888',
    paddingBottom: 10,
  },
  button: {
    alightSelf: 'right',
    fontSize: 11,
    status: 'basic',
    paddingBottom: 10,
    borderRadius: 20
  },
});