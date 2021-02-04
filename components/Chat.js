import React from 'react';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import { ThemeColors } from 'react-navigation';
import { 
    View, Text, Button, TextInput, StyleSheet, Platform, KeyboardAvoidingView
} from 'react-native';

// connection to Firestore
const firebase = require('firebase');
require('firebase/firestore');

// the Chat component's render function displays the chat screen of the messaging app
export default class Chat extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      uid: 0,
    };

    // connecting to the database
    var firebaseConfig = {
      apiKey: "AIzaSyA1l5Lb9EAKcc9v7sJVxcibePMhLTouPTI",
      authDomain: "chat-app2-65647.firebaseapp.com",
      projectId: "chat-app2-65647",
      storageBucket: "chat-app2-65647.appspot.com",
      messagingSenderId: "744481998719",
      appId: "1:744481998719:web:b912238963dc8202b73c4a",
      measurementId: "G-C4WL3WV2PK"
    };

    if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }

    // creating a reference to the messages collection 
    this.referenceChatMessages = firebase.firestore().collection('messages');

  }

  // getMessages = async() => {
  //   let messages = [];
  //   try{
  //     messages = (await AsyncStorage.getItem('messages')) || [];
  //     this.setState({
  //       messages: JSON.parse(messages)
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // componentDidMount() {
    
  //       // firebase.auth calls the firebase auth service for the app
  //       this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
  //         if (!user) {
  //           await firebase.auth().signInAnonymously();
  //         }
  //         else {
  //           this.setState({
  //             user: {
  //               _id: user.uid,
  //               name: this.props.route.params.name,
  //               avatar: 'https://placeimg.com/140/140/any'
  //             },
  //             messages: [],
  //           });
  //           this.unsubscribe = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate); 
  //         }
  //       });                     
  //   // calling the onSnapshot function to receive the updated data
  //   this.referenceChatMessages = firebase.firestore().collection('messages');
    
  // }

  // componentWillUnmount() {
  //   // calling unsubscribe to stop receiving updates from a collection
  //   this.unsubscribe();
  //   // stop listening to authentication
  //   this.authUnsubscribe();
  // }

  componentDidMount() {

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        user: {
          _id: user.uid,
          name: this.props.route.params.name,
          avatar: 'https://placeimg.com/140/140/any'
        },
        messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });

    this.referenceChatMessages = firebase.firestore().collection('messages');
  }
  
   componentWillUnmount() {
      // calling unsubscribe to stop receiving updates from a collection
      this.unsubscribe();
      // stop listening to authentication
      this.authUnsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages
    });
  }

  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
      uid: this.state.uid,
    });
  }

  onSend(messages = []) {
    // setState is called with previousState as the parameter -> reference to the component's
    // state at the time the change is applied.
    this.setState(previousState => ({
      // the append function by Gifted chat appends the new message to the message obj.
      messages: GiftedChat.append(previousState.messages, messages),
    }),
    () => {
      this.addMessage();
    });
  }


  // change bg color of text bubble
  renderBubble(props) {
    return (
      <Bubble 
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
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
        <View style={{flex: 1, backgroundColor: color}}>
            <GiftedChat
                renderBubble={this.renderBubble.bind(this)}
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={this.state.user}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
        </View>
    );

  }
}