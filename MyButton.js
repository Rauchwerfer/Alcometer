import { Text, TouchableHighlight } from 'react-native';
import { StyleSheet } from "react-native"

export default function MyButton(props) {
  return (
    <TouchableHighlight underlayColor={'hsl(211, 100%, 25%)'} onPress={props.action} style={myButtonStyles.button}>
      <Text style={myButtonStyles.buttonCaption}>Calculate</Text>
    </TouchableHighlight> 
  )
}

const myButtonStyles = StyleSheet.create({
      button: {
        width: '66%',
        alignItems: "center",
        backgroundColor: 'hsl(211, 100%, 50%)',
        borderRadius: 10,
        alignSelf: 'center'
      },
      buttonCaption: {
        fontSize: 35,
        fontWeight: 'bold',    
        color: 'white'
      }
})