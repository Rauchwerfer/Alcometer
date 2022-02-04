import { Text, View, TextInput, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';
import { useState } from 'react';
import { Header as HeaderRNE, HeaderProps, Icon } from 'react-native-elements';
import styles from './Styles';
import MyButton from './MyButton';

export default function App() {
  const [weight, setWeight] = useState(0);
  const [bottle, setBottle] = useState(1);
  const [gender, setGender] = useState('male');
  const [time, setTime] = useState(1);
  const [alcoholLevel, setAlcoholLevel] = useState(0);
  const [isVisibleResult, setIsVisibleResult] = useState(false);
  const [outputColor, setOutputColor] = useState('');

  const bottles = Array();
  bottles.push({label: '1 bottle', value: 1});
  bottles.push({label: '2 bottles', value: 2});
  bottles.push({label: '3 bottles', value: 3});
  bottles.push({label: '4 bottles', value: 4});
  bottles.push({label: '5 bottles', value: 5});
  bottles.push({label: '6 bottles', value: 6});
  bottles.push({label: '7 bottles', value: 7});
  bottles.push({label: '8 bottles', value: 8});
  bottles.push({label: '9 bottles', value: 9});

  const times = Array();
  times.push({label: '1 hour', value: 1});
  times.push({label: '2 hours', value: 2});
  times.push({label: '3 hours', value: 3});
  times.push({label: '4 hours', value: 4});
  times.push({label: '5 hours', value: 5});
  times.push({label: '6 hours', value: 6});
  times.push({label: '7 hours', value: 7});
  times.push({label: '8 hours', value: 8});
  times.push({label: '9 hours', value: 9});

  const genders = [
    {label: 'Male', value: 'male' },
    {label: 'Female', value: 'female'}
  ];

  const callAlert = () =>
    Alert.alert(
      "Warning",
      "Weight can not be empty or zero!",
      [
        { text: "Dismiss" }
      ]
    );

  function calculate() {
    let result = 0;

    if (weight != 0) {
      if (gender === 'male') {
        result = ((bottle * 0.33) * 8 * 4.5 - weight / 10 * time) / (weight * 0.7)
      } else {
        result = ((bottle * 0.33) * 8 * 4.5 - weight / 10 * time) / (weight * 0.6)
      }

      if (result < 0) {
        result = 0;
      }
      setIsVisibleResult(true);
      setAlcoholLevel(result);

      if (result < 0.16) {
        setOutputColor('green');
      }
      if (result < 0.55 && result >= 0.16 ) {
        setOutputColor('yellow');
      }
      if (result > 0.54) {
        setOutputColor('red');
      }
    } else {
      setIsVisibleResult(false);
      callAlert();
    }    
  }
  
  return (
      
    <View style={styles.container}>
      <HeaderRNE
        /* leftComponent={{
          icon: 'menu',
          color: '#fff',
        }} */
        centerComponent={{ text: 'Alcometer', style: styles.heading }}
      />
      <ScrollView>
        <View style={styles.field}>
          <Text> Weight</Text>
          <TextInput 
          style={styles.input}
          onChangeText={text => setWeight(text)}
          placeholder="in kilograms"
          keyboardType='numeric' ></TextInput>
        </View>
        <View style={styles.field}>
          <Text> Bottles</Text>
          <Picker 
          style={styles.picker}
          onValueChange={(itemValue) => setBottle(itemValue)}
          selectedValue={bottle} 
          >
            {bottles.map((bottle, index) => (
              <Picker.Item key={index} label={bottle.label} value={bottle.value} />
            ))}
          </Picker>
        </View>
        <View style={styles.field}>
          <Text> Time</Text>
          <Picker 
          style={styles.picker}
          onValueChange={(itemValue) => setTime(itemValue)}
          selectedValue={time} 
          >
            {times.map((time, index) => (
              <Picker.Item key={index} label={time.label} value={time.value} />
            ))}
          </Picker>
        </View>
        <View style={styles.field}>
          <Text> Gender</Text>
          <RadioForm 
            style={styles.radio}
            buttonSize = {10}
            radio_props={genders}
            initial={0}
            onPress={(value) => setGender(value)}
          />
          { isVisibleResult ? <Text
            style={[styles.output, {color: outputColor}]}
            >{alcoholLevel.toFixed(2)}</Text> : null }
        </View>  
        <View style={styles.field}>
          <MyButton action={calculate} />        
        </View>              
      </ScrollView>
    </View>
  );
}