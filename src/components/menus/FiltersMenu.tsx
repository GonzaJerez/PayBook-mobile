import {Ionicons} from '@expo/vector-icons'
import React, {useContext, useState} from 'react'
import {View, Text, Animated, StyleSheet} from 'react-native'

import {StatisticsContext} from '../../context/statistics/StatisticsContext'
import {ThemeContext} from '../../context/theme/ThemeContext'
import {useFiltersItems} from '../../hooks/useFiltersItems'
import {TertiaryButton} from '../buttons/TertiaryButton'
import {FilterAmounts} from '../item-lists/FilterAmounts'
import {FilterItem} from '../item-lists/FilterItem'


interface Props {
  right: Animated.Value
}


export const FiltersMenu = ({right}: Props) => {

  const {theme} = useContext(ThemeContext)
  const {cleanFilters} = useContext(StatisticsContext)

  const [filterOpen, setFilterOpen] = useState('')

  const {filtersItems} = useFiltersItems()


  return (
    <Animated.ScrollView 
      style={
        [styles.container, {
          backgroundColor: theme.colors.background, 
          right, 
          borderColor: theme.disable,
          shadowColor: theme.shadow
        }]
      }
    >

      <View style={[styles.fieldsContainer, {borderColor: theme.disable}]}>
        <Text style={[styles.title, {color: theme.colors.text}]}>Filtros</Text>
        {
          filtersItems.map((filter, index) => (
            <FilterItem
              key={index}
              label={filter.filterName}
              options={filter.options}
              isOpen={filterOpen === filter.filterName}
              setFilterOpen={setFilterOpen}
            />
          ))
        }
        <FilterAmounts 
          isOpen={filterOpen === 'amounts'}
          label='amounts'
          setFilterOpen={setFilterOpen}
        />
      </View>

      <View style={styles.cleanFiltersContainer}>
        <Ionicons 
          name='water-outline'
          size={16}
          color={theme.colors.primary}
        />
      <TertiaryButton
        label='Limpiar todos los filtros'
        onPress={cleanFilters}
        style={styles.cleanFiltersButton}
      />
      </View>

    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '40%',
    borderTopStartRadius: 5,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 5
  },
  title: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20
  },
  fieldsContainer: {
    borderBottomWidth: 1
  },
  cleanFiltersContainer:{
    flexDirection:'row',
    // borderWidth:1,
    alignItems:'center',
    marginVertical:30,
    justifyContent:'center'
  },
  cleanFiltersButton: {
    // alignItems: 'center'
    marginVertical:0,
    marginLeft:5
  }
})