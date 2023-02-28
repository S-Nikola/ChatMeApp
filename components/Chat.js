// import React from "react";
// import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from "react-native";
// import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import NetInfo from '@react-native-community/netinfo';

import React from "react";
import { View, Text, Button } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';


// // Google firebase / firestore
// const firebase = require('firebase');
// require('firebase/firestore');
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAs8394dgpeBpWqBpe8LSgN3OiqKU7yKd8",
//   authDomain: "chatmeapp-bc433.firebaseapp.com",
//   projectId: "chatmeapp-bc433",
//   storageBucket: "chatmeapp-bc433.appspot.com",
//   messagingSenderId: "545185976878",
//   appId: "1:545185976878:web:afde6c26fe030b7e6c85bf"
// };

// // Initialize Firebase
// if(!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        avatar: '',
        name: '',
      }
    };
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAs8394dgpeBpWqBpe8LSgN3OiqKU7yKd8",
        authDomain: "chatmeapp-bc433.firebaseapp.com",
        projectId: "chatmeapp-bc433",
        storageBucket: "chatmeapp-bc433.appspot.com",
        messagingSenderId: "545185976878",
        appId: "1:545185976878:web:afde6c26fe030b7e6c85bf"
      });
    }
    this.referenceMessagesUser = null;
    this.addMessage = this.addMessage.bind(this);
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
        avatar: data.user.avatar || '',
      }
     });
   });
   this.setState({ messages });
  };

   // save message to Firestore
   addMessage = () => {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  };

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
    () => {
      this.saveMessages();
      this.addMessage();
    }
    );
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  };

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  };

  componentDidMount() {
    //checks if user in online
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
      } else {
        console.log('offline');
      }
    });
    //retrieves messages from asyncStorage
    this.getMessages();
     // creating a references to shoppinglists collection
     this.referenceMessages = firebase
     .firestore()
     .collection("messages");
   
    
    let name = this.props.route.params.name;
    let color = this.props.route.params.color;
    this.props.navigation.setOptions({ title: name, backgroundColor: color });

// listen to authentication events
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
        },
        loggedInText: '',
      });
      this.unsubscribe = this.referenceMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  };

  

  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribeListUser();
  }


  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#12436f'
          }
        }}
      />
    )
  }

  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name })
    let color = this.props.route.params.color;
    return (
      <View style={[styles.container, { backgroundColor: color}]}>
      <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        renderInputToolbar={this.renderInputToolbar}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: this.state.user._id,
          avatar: 'https://placeimg.com/140/140/any',
          name: name
        }}
      />

      {/* fixes the keyboard entering the input box */}
      { Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height"/>
        ) : null
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },})