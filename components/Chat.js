
import React from 'react';
import { View, Text, Platform, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { NavigationEvents } from 'react-navigation';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';
import { Constants, MapView, Location, Permissions } from 'expo';

// importing and establishing a connection to Firestore
const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      uid: 0,
      isConnected: false,
      image: null,
      location: null
    };

    // connecting to the database
    const firebaseConfig = {
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

  getMessages = async() => {
    let messages = [];
    try{
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  saveMessages = async() => {
    try{
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }


  deleteMessages = async() => {
    try{
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }


  componentDidMount() {
    
    // Online = firestore offline = asyncstorage
    NetInfo.fetch().then((state) => {
      if(state.isConnected) {
        console.log('online');
        // firebase.auth calls the firebase auth service for the app
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          else {
            this.setState({
              isConnected: true,
              user: {
                _id: user.uid,
                name: this.props.route.params.name,
                avatar: 'https://placeimg.com/140/140/any'
              },
              messages: [],
            });
            this.unsubscribe = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate); 
          }
        });       
      } else {
        console.log('offline');
        this.getMessages();
        this.setState({
          isConnected: false,
        });            
      }
    });
      
    // calling the onSnapshot function to receive the updated data
    this.referenceChatMessages = firebase.firestore().collection('messages');
    
  }

  componentWillUnmount() {
    // calling unsubscribe to stop receiving updates from a collection
    this.unsubscribe();
    // stop listening to authentication
    this.authUnsubscribe();
  }

  onSend(messages = []) {

    this.setState(previousState => ({

      messages: GiftedChat.append(previousState.messages, messages),
    }),
    () => {
      this.addMessage();
      this.saveMessages();
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  }

  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }


  renderBubble(props) {
    return (
      <Bubble 
        {...props}
        wrapperStyle={{
          // changing the background color of the message bubble on the right side.
          right: {
            backgroundColor: '#000',
          }
        }}
      />
    );
  }

  // to render the input bar only when the user is online
  renderInputToolbar(props) {
    if(this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props} 
        />
      );
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions { ...props} />;
  }

  renderCustomView(props) {
    const { currentMessage } = props;
    if(currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    // username & background color
    let name  = this.props.route.params.name;
    let color = this.props.route.params.color;
    this.props.navigation.setOptions({ title: name });

    return (
        <View style={{flex: 1, backgroundColor: color}}>
            {this.state.image &&
            <Image source={{ uri: this.state.image.uri }}
                style={{ width: 200, height: 200 }} 
                />
            }        
            <GiftedChat
                renderBubble={this.renderBubble.bind(this)}
                messages={this.state.messages}
                isConnected={this.state.isConnected}
                renderInputToolbar={this.renderInputToolbar.bind(this)}
                onSend={messages => this.onSend(messages)}
                user={this.state.user}
                renderActions={this.renderCustomActions}
                renderCustomView={this.renderCustomView}
                image={this.state.image}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
    );
  }
}