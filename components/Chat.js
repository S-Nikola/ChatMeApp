import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', color: this.props.color };
  }

  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name })
    let color = this.props.route.params.color;
    return (
      <View style={[styles.container, { backgroundColor: color}]}>
        <Text style={{color: '#fff', fontWeight: '600'}}>Hello Chat screen!</Text>
        <Button
          title="Go to Start"
          onPress={() => this.props.navigation.navigate('Start')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },})