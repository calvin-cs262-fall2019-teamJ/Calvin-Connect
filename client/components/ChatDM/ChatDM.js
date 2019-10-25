// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0


import Fire from '../Fire';

type Props = {
  name?: string,
};

class ChatDM extends React.Component<Props> {
  
 static navigationOptions = ({ navigation }) => ({
    title: "Chat"
  });

  state = {
    messages: [],
  };

  get user() {
    return {
      name: "Joe Shmoe",
      _id: Fire.shared.uid,
    };
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))   
    );  
  }
  componentWillUnmount() {
    Fire.shared.off();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
  }

}

export default ChatDM;
