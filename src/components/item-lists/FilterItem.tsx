import React, {useContext} from 'react'
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import {ThemeContext} from '../../context/theme/ThemeContext'
import {CheckboxField} from '../form/CheckboxField'
import {StatisticsContext} from '../../context/statistics/StatisticsContext'
import {FiltersStatisctics} from '../../interfaces/Expense'
import {MONTHS, spanishFilterNames} from '../../constants/ConstantsFilters'
import {TertiaryButton} from '../buttons/TertiaryButton'


interface Props {
  label: keyof FiltersStatisctics;
  options: { label: string; value: string; }[];
  isOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<string>>
}

export const FilterItem = ({label, options, isOpen, setFilterOpen}: Props) => {

  const {theme} = useContext(ThemeContext)
  const {filtersApplied, addFilter, removeFilter, cleanOneFilter} = useContext(StatisticsContext)

  const isSelected = (opt: string) => {
    let isSelected = false;

    if (label !== 'max_amount' && label !== 'min_amount') {
      isSelected = filtersApplied[label]?.includes(opt) || false
    }

    return isSelected;
  }

  return (
    <View style={[styles.container, {borderColor: theme.disable}]}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={(isOpen) ? () => setFilterOpen('') : () => setFilterOpen(label)}
      >
        <View style={styles.labelContainer}>
          <Text style={[styles.label, {color: theme.ligthText}]}>{spanishFilterNames[label]}</Text>
          {(label !== 'max_amount' && label !== 'min_amount' && ((filtersApplied[label]?.length || []) > 0)) && (
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
        <View style={styles.optionsContainer}>
          {options.map((opt, index) => (
            (isSelected(opt.value) && (
              <CheckboxField
                key={index}
                label={(label === 'month') ? MONTHS[+opt.label] : opt.label}
                style={styles.option}
                initialState={isSelected(opt.value)}
                onPress={()=>removeFilter(label, opt.value)}
              />
            ))
          ))}
          {options.map((opt, index) => (
            (!isSelected(opt.value) && (
              <CheckboxField
                key={index}
                label={(label === 'month') ? MONTHS[+opt.label] : opt.label}
                style={styles.option}
                initialState={isSelected(opt.value)}
                onPress={()=>addFilter(label, opt.value)}
              />
            ))
          ))}
          <TertiaryButton 
            label='Limpiar filtro'
            onPress={()=>cleanOneFilter(label)}
            style={styles.cleanFilterButton}
          />
        </View>
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
  optionsContainer: {
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  option: {
    marginVertical: 5
  },
  cleanFilterButton:{
    alignSelf:'center', 
    marginTop:10, 
    marginBottom:0
  }
})