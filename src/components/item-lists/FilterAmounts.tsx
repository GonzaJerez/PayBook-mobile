import React, {useContext} from 'react'
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import {ThemeContext} from '../../context/theme/ThemeContext'
import {StatisticsContext} from '../../context/statistics/StatisticsContext'
import {FilterAmountsForm} from '../form/FilterAmountsForm'


interface Props {
  label: string;
  isOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<string>>
}

export const FilterAmounts = ({label, isOpen, setFilterOpen}: Props) => {

  const {theme} = useContext(ThemeContext)
  const {filtersApplied} = useContext(StatisticsContext)

  return (
    <View style={[styles.container, {borderColor: theme.disable}]}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={(isOpen) ? () => setFilterOpen('') : () => setFilterOpen(label)}
      >
        <View style={styles.labelContainer}>
          <Text style={[styles.label, {color: theme.ligthText}]}>Monto</Text>
          {(filtersApplied.max_amount || filtersApplied.min_amount) && (
            <View style={[styles.filtersApplied, {backgroundColor: theme.colors.primary}]} />
          )}
        </View>
        <Ionicons
          name='caret-down-outline'
          size={16}
          color={theme.ligthText}
        />
      </TouchableOpacity>

      {isOpen && (
        <FilterAmountsForm />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelContainer: {
  },
  label: {
    fontSize: 16,
    fontWeight: '500'
  },
  filtersApplied: {
    width: 8,
    height: 8,
    position: 'absolute',
    right: -5,
    top: 2,
    borderRadius: 100
  },
})