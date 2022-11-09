import React from 'react'
import {View} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';


interface Props {
  date: Date;
  show: boolean;
  onChange: (_event: any, selectedDate?: Date) => void
}

export const DatePickerAndroid = ({date, show, onChange}: Props) => {
  return (
    <View>
      {
        show && (
          <DateTimePicker
            maximumDate={new Date()}
            value={date}
            mode={'date'}
            onChange={(e, newDate) => onChange(e, newDate)}
          />
        )
      }
    </View>
  )
}
