import React, {useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AccountStackNavigation} from '../../navigation/AccountNavigation';
import {TertiaryButton} from '../buttons/TertiaryButton';
import {SubcategoryItem} from '../item-lists/SubcategoryItem';
import {CategoriesContext} from '../../context/categories/CategoriesContext';


export const SubcategoriesList = () => {
  const {navigate} = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>()
  const {actualCategory} = useContext(CategoriesContext)

  return (
    <View style={styles.container}>
      <TertiaryButton 
        label={'Nueva subcategoría +'}
        onPress={()=>navigate('NewCategoryScreen',{type:'subcategoría'})}
        style={styles.addButton}
      />
      {
        actualCategory?.subcategories?.map( subcat => (
          <SubcategoryItem
            key={subcat.id}
            subcategory={subcat}
          />
        ))
      }
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