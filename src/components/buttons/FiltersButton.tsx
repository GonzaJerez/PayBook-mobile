import React, {useContext} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import {ThemeContext} from '../../context/theme/ThemeContext';
import {StatisticsContext} from '../../context/statistics/StatisticsContext';


interface Props {
  onPress: () => void
}

export const FiltersButton = ({onPress}: Props) => {

  const {theme} = useContext(ThemeContext)
  const {filtersApplied} = useContext(StatisticsContext)

  const numFiltersApplied = Object.values(filtersApplied).filter(values => (values && values.length > 0)).length

  return (
    <TouchableOpacity
      style={styles.filtersButton}
      onPress={onPress}
    >

      <Ionicons
        name='options-outline'
        size={20}
        color={theme.colors.text}
      />

      <Text style={[styles.filtersButtonText, {color:theme.colors.text}]}>Filtros</Text>

      {(numFiltersApplied > 0) && (
        <View style={[styles.filtersAppliedContainer, {backgroundColor:theme.colors.primary}]}>
          <Text style={[styles.numFilterApplied, {color:theme.colors.card}]}>{numFiltersApplied}</Text>
        </View>
      )}

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  filtersButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filtersButtonText: {
    marginRight: 5
  },
  filtersAppliedContainer: {
    position:'absolute',
    // borderWidth:1,
    width:15,
    height:15,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    borderRadius:100,
    right:-5,
    top:-3
  },
  numFilterApplied: {
    // top:-1,
    fontSize:11,
    fontWeight:'600',
  }
})