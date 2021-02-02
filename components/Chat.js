import React from 'react';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import { ThemeColors } from 'react-navigation';
import { 
    View, Text, Button, TextInput, StyleSheet, Platform, KeyboardAvoidingView
} from 'react-native';

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            name: '',
            color: '',
            messages: [],
        }
    }

    componentDidMount() {
        this.setState({
            messages: [
                // user message beloww
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: '',
                    },
                },
                // System message below 
                {
                    _id: 2,
                    text: 'You have entered the chat', 
                    createdAt: new Date(),
                    system: true
                },
            ],
        })
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    // Speech bubble customization
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: 'blue',
                    },
                    left: {
                        backgroundColor: 'yellow'
                    }
                }}
            />    
        );
    }

    render() {
        // All props passed from the Start view
        let name = this.props.route.params.name;
        let color = this.props.route.params.color;
        this.props.navigation.setOptions({title: name});

        return (
            <View style={{flex: 1}}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
            </View>
        );
    };
}


{/* <TouchableOpacity
  accessible={true}
  accessibilityLabel="More options"
  accessibilityHint="Lets you choose to send an image or your geolocation."
  accessibilityRole="button"
  onPress={this._onPress}>
  <View style={styles.button}>
   ...
  </View>
</TouchableOpacity> */}