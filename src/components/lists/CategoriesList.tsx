import React, {useContext, useEffect} from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
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
    <FlatList 
      data={allCategories}
      renderItem={({item})=>(
        <CategoryItem
          key={item.id}
          category={item}
        />
      )}
      style={styles.container}
      ListHeaderComponent={()=>(
        <TertiaryButton
        label={'Nueva categoría +'}
        onPress={() => navigate('NewCategoryScreen',{type:'categoría'})}
        style={styles.addButton}
      />
      )}
      ListFooterComponent={()=>(
        <View style={styles.footer}/>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  addButton: {
    alignSelf: 'center'
  },
  footer:{
    height:50
  }
})