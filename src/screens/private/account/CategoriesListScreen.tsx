import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {CategoriesList} from '../../../components/lists/CategoriesList'

export const CategoriesListScreen = () => {
  return (
    <View style={styles.container}>
      <CategoriesList/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})