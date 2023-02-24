import React from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const backgroundColors = {
  black: { backgroundColor: '#000000'},
  grey: { backgroundColor: '#8a95a5'},
  purple: { backgroundColor: '#474056'},
  orange: { backgroundColor: '#ffa500'}
}

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', color: '' };
  }

  render() {
    const { black, grey, purple, orange} = backgroundColors;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/background-image.png')}
          style={[styles.container, styles.image]}
        >
          <View style={styles.title}>
            <Text style={styles.titleText}>ChatMeApp</Text>
          </View>
          <View style={styles.inputBox} >
            <TextInput
              style={styles.nameBox}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Enter a name'
              />
              <View>
                <Text style={styles.chooseBackground} >Choose your Background:</Text>
                <View style={styles.colorWrapper}>
                  <TouchableOpacity style={[styles.color, black]}
                    onPress={() =>
                    this.setState({ color: black.backgroundColor })
                    }
                  />
                  <TouchableOpacity style={[styles.color, grey]}
                    onPress={() =>
                    this.setState({ color: grey.backgroundColor })
                    }
                  />
                  <TouchableOpacity style={[styles.color, purple]}
                    onPress={() =>
                    this.setState({ color: purple.backgroundColor })
                    }
                  />
                  <TouchableOpacity style={[styles.color, orange]}
                    onPress={() =>
                    this.setState({ color: orange.backgroundColor })
                    }
                  />
                </View>
              </View>
              <TouchableOpacity
                style={[styles.nameBox, styles.startChat]}
                onPress={() => 
                this.props.navigation.navigate('Chat', 
                {
                    name: this.state.name, 
                    color: this.state.color
                })
                }
                >
                <Text style={[styles.colorSelector, styles.startChat]} >
                  Start Chatting
                </Text>
                </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },

  image: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    flex: 66,
  },

  titleText: {
    color: '#fff',
    fontSize: 45,
    fontWeight: '600',
    marginTop: 50
  },

  inputBox: {
    flex: 44,
    width: '88%',
    backgroundColor: '#fff',
    marginBottom: 15,
    height: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20
  },

  nameBox: {
    height: 50,
    width: '88%',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 2,
    color: '#757083',
    opacity: 50,
    fontSize: 16,
    fontWeight: '300',
    paddingLeft: 10
  },

  chooseBackground: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100
  },

  colorWrapper: {
    flexDirection: 'row',
    width: '88%',
  },

  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10
  },

  startChat: {
    backgroundColor: '#757083',
    width: '88%',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
})