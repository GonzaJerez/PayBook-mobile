import React, {useContext, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {AccountStackNavigation} from '../../navigation/AccountNavigation'
import {TertiaryButton} from '../buttons/TertiaryButton'
import {CategoryItem} from '../item-lists/CategoryItem'
import {CategoriesContext} from '../../context/categories/CategoriesContext'


export const CategoriesList = () => {

  const {navigate} = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>()
  const {allCategories, getCategories, setActualCategory} = useContext(CategoriesContext)

  useEffect(()=>{
    getCategories();
    setActualCategory(null)
  },[])

  return (
    <View style={styles.container}>
      <TertiaryButton
        label={'Nueva categoría +'}
        onPress={() => navigate('NewCategoryScreen',{type:'categoría'})}
        style={styles.addButton}
      />
      {allCategories.map(cat => (
        <CategoryItem
          key={cat.id}
          category={cat}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  addButton: {
    alignSelf: 'center'
  }
})