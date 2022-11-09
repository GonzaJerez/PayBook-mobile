import {View, Text, Platform, TouchableOpacity, StyleSheet} from 'react-native'
import React, {useContext, useState} from 'react'
import {Ionicons} from '@expo/vector-icons';

import {DatePickerIOS} from './DatePickerIOS';
import {DatePickerAndroid} from './DatePickerAndroid';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useField} from 'formik';


interface Props {
  name: string;
}


export const DateInput = ({name}:Props) => {

  const {theme} = useContext(ThemeContext)
  const [show, setShow] = useState(false);

  const [field, meta, helpers] = useField(name)

  const formatDate = (completeDate:Date)=>{
    const dateString = completeDate.toLocaleDateString()
    const [month, day, year] = dateString.split('/')
    return `${day}/${month}/${year}`
  }


  const onChange = (_event: any, selectedDate?: Date) => {
    (Platform.OS === 'android') && setShow(false);
    helpers.setValue(selectedDate)
  };


  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: theme.ligthText}]}>Fecha:</Text>

      <TouchableOpacity
        onPress={() => setShow(true)}
        style={[styles.pickerButton, {borderColor: theme.colors.border}]}
      >
        <Text style={[styles.dateText,{color:theme.colors.text}]}>{formatDate(field.value)}</Text>
        <Ionicons 
          name='calendar-outline'
          size={18}
        />
      </TouchableOpacity>


      {Platform.OS === 'ios'
        ? (<DatePickerIOS date={field.value} show={show} setShow={setShow} onChange={onChange} />)
        : (<DatePickerAndroid date={field.value} show={show} onChange={onChange} />)
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    width: '40%'
  },
  pickerButton: {
    borderWidth: 1,
    flex: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:5,
    flexDirection:'row'
  },
  dateText: {
    fontSize: 16,
    marginRight:5
  }
})