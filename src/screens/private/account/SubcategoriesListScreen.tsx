import React, {useContext, useEffect} from 'react'
import { View} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {AccountStackNavigation} from '../../../navigation/AccountNavigation'
import {SubcategoriesList} from '../../../components/lists/SubcategoriesList'
import {CategoriesContext} from '../../../context/categories/CategoriesContext'


interface Props extends NativeStackScreenProps<AccountStackNavigation,'SubcategoriesListScreen'>{}

export const SubcategoriesListScreen = ({navigation}:Props) => {

  const {actualCategory} = useContext(CategoriesContext)

  useEffect(()=>{
    navigation.setOptions({
      title:actualCategory?.name
    })
  },[actualCategory])

  return (
    <View>
      <SubcategoriesList/>
    </View>
  )
}
