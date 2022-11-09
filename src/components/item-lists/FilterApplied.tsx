import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'


interface Props {
  label: string;
}

export const FilterApplied = ({label}:Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelFilter}>{label}</Text>
      <TouchableOpacity
        style={styles.iconContainer}
      >
        <Ionicons
          name='close-outline'
          size={20}
          style={styles.icon}
        />

      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal:5,
    marginBottom:5
  },
  labelFilter:{
    fontSize:12
  },
  iconContainer:{
  },
  icon: {
    top: 1
  }
})