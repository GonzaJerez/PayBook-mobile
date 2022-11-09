import React, {useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {EditName} from '../../../components/form/EditName'
import {AccountStackNavigation} from '../../../navigation/AccountNavigation'
import {DeleteButton} from '../../../components/buttons/DeleteButton'
import {CategoriesContext} from '../../../context/categories/CategoriesContext'
import {SubcategoriesContext} from '../../../context/subcategories/SubcategoriesContext'
import {UpdateSubcategory} from '../../../interfaces/Subcategory'
import {useAlertToConfirm} from '../../../hooks/useAlertToConfirm'


interface Props extends NativeStackScreenProps<AccountStackNavigation,'EditCategoryScreen'>{}

export const EditCategoryScreen = ({navigation,route}:Props) => {

  const {type, element} = route.params;
  const {updateCategory, removeCategory} = useContext(CategoriesContext)
  const {updateSubcategory, removeSubcategory} = useContext(SubcategoriesContext)

  const toUpdateSubcategory = (body:UpdateSubcategory)=>{
    updateSubcategory(body, element?.id || '')
  }

  const {showAlert:showAlertDeleteCategory} = useAlertToConfirm({
    title: 'Eliminar categoría',
    message: '¿Estás seguro que deseas eliminar esta categoría?',
    onCancel: ()=>{},
    onConfirm: ()=>{
      navigation.goBack();
      removeCategory()
    },
    textToConfirm: 'Eliminar'
  })

  const {showAlert:showAlertDeleteSubcategory} = useAlertToConfirm({
    title: 'Eliminar subcategoría',
    message: '¿Estás seguro que deseas eliminar esta subcategoría?',
    onCancel: ()=>{},
    onConfirm: ()=>{
      navigation.goBack();
      removeSubcategory(element?.id || '')
    },
    textToConfirm: 'Eliminar'
  })

  const toDelete = async()=>{
    if(type === 'categoría') await showAlertDeleteCategory()
    if(type === 'subcategoría') await showAlertDeleteSubcategory()
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <EditName 
        label={type}
        initialValue={element?.name || ''}
        onSubmit={(type === 'categoría') ? updateCategory : toUpdateSubcategory}
      />
      <DeleteButton 
        label='Eliminar' 
        onPress={toDelete}
        style={styles.deleteButton}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  deleteButton:{
    alignSelf:'center',
    marginTop:30
  }
})