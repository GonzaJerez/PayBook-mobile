import React, {useContext} from 'react'
import {TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {AccountStackNavigation} from '../../navigation/AccountNavigation'
import {CategoriesContext} from '../../context/categories/CategoriesContext'

export const SettingsButton = () => {

  const {navigate} = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>()
  const {actualCategory} = useContext(CategoriesContext)

  return (
    <TouchableOpacity
      onPress={() => navigate('EditCategoryScreen', {type: 'categoría', element: actualCategory})}
    >
      <Ionicons
        name='settings-outline'
        size={25}
      />
    </TouchableOpacity>
  )
}
