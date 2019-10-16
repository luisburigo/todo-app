import React from 'react';
import {View, Text} from "react-native";
import Button from "./components/Button.js";
import {StyleSheet} from "react-native";

export default function App(props) {
  return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button label="1" onClick={() => alert('1')}/>
          <Button label="2" onClick={() => alert('2')}/>
          <Button label="3" onClick={() => alert('3')}/>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({

});
