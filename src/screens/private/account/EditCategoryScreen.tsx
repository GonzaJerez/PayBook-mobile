import React, {useContext, useState} from 'react'
import { View, StyleSheet } from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {AccountStackNavigation} from '../../../navigation/AccountNavigation'
import {DeleteButton} from '../../../components/buttons/DeleteButton'
import {CategoriesContext} from '../../../context/categories/CategoriesContext'
import {SubcategoriesContext} from '../../../context/subcategories/SubcategoriesContext'
import {UpdateSubcategory} from '../../../interfaces/Subcategory'
import {useAlertToConfirm} from '../../../hooks/useAlertToConfirm'
import {EditNameField} from '../../../components/form/EditNameField'
import {ErrorRequest} from '../../../components/texts/ErrorRequest'


interface Props extends NativeStackScreenProps<AccountStackNavigation,'EditCategoryScreen'>{}

export const EditCategoryScreen = ({navigation,route}:Props) => {

  const {type, element} = route.params;
  const {updateCategory, removeCategory, isLoading:isLoadingCategory} = useContext(CategoriesContext)
  const {updateSubcategory, removeSubcategory, isLoading:isLoadingSubcategory} = useContext(SubcategoriesContext)
  const [error, setError] = useState<string>()

  const toUpdateSubcategory = (body:UpdateSubcategory)=>{
    return updateSubcategory(body, element?.id || '')
  }

  const {showAlert:showAlertDeleteCategory} = useAlertToConfirm({
    title: 'Eliminar categoría',
    message: '¿Estás seguro que deseas eliminar esta categoría?',
    onCancel: ()=>{},
    onConfirm: async ()=>{
      const errorMessage = await removeCategory()
      if(errorMessage){
        setError(errorMessage)
      } else {
        navigation.goBack()
      }
    },
    textToConfirm: 'Eliminar'
  })

  const {showAlert:showAlertDeleteSubcategory} = useAlertToConfirm({
    title: 'Eliminar subcategoría',
    message: '¿Estás seguro que deseas eliminar esta subcategoría?',
    onCancel: ()=>{},
    onConfirm: async ()=>{
      const errorMessage = await removeSubcategory(element?.id || '')
      if(errorMessage){
        setError(errorMessage)
      } else {
        navigation.goBack()
      }
    },
    textToConfirm: 'Eliminar'
  })

  const toDelete = async()=>{
    if(type === 'categoría') showAlertDeleteCategory();
    if(type === 'subcategoría') showAlertDeleteSubcategory();
  }

  return (
    <View style={styles.container}>
      <EditNameField 
        label={type}
        initialValue={element?.name || ''}
        onSubmit={(type === 'categoría') ? updateCategory : toUpdateSubcategory}
        isLoading={isLoadingCategory || isLoadingSubcategory}
      />
      <DeleteButton 
        label='Eliminar' 
        onPress={toDelete}
        style={styles.deleteButton}
        isLoading={isLoadingCategory || isLoadingSubcategory}
      />
      {(error) && (<ErrorRequest>{error}</ErrorRequest>)}
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