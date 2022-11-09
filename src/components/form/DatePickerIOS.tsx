import React, {useContext, useState} from 'react'
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

import {ThemeContext} from '../../context/theme/ThemeContext';


interface Props {
  date: Date;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  // setDate: React.Dispatch<React.SetStateAction<Date>>;
  onChange: (_event: any, selectedDate?: Date) => void
}

export const DatePickerIOS = ({date, show, setShow, onChange}: Props) => {

  const {theme} = useContext(ThemeContext)

  const [prevDate, setPrevDate] = useState(date)

  const onCancelDate = () => {
    // setDate(prevDate);
    setShow(false)
  }

  return (
    <Modal
      animationType='fade'
      visible={show}
    >
      <View style={[styles.container, {backgroundColor: theme.backgroundModal}]}>

        <DateTimePicker
          maximumDate={new Date()}
          value={date}
          mode={'date'}
          onChange={(e, newDate) => onChange(e, newDate)}
          style={styles.datePicker}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={onCancelDate}
          >
            <Text>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShow(false)}
          >
            <Text>Ok</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  datePicker: {
    marginTop: 50
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})