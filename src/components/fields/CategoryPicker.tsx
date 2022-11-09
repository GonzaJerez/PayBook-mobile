import React, {useContext} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {useField} from 'formik';

import {ThemeContext} from '../../context/theme/ThemeContext';
import {CategoriesContext} from '../../context/categories/CategoriesContext';
import {Category} from '../../interfaces/Category';
import {Subcategory} from '../../interfaces/Subcategory';


interface Props {
  label: string;
  options: Category[] | Subcategory[];
  name: string;
}

export const CategoryPicker = ({label, options, name}: Props) => {

  const {theme} = useContext(ThemeContext)
  const {setActualCategory, allCategories, actualCategory} = useContext(CategoriesContext)

  const [field, meta, helpers] = useField(name)
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: theme.ligthText}]}>{label}:</Text>
      <Picker
        style={[styles.pickerContainer]}
        dropdownIconColor={theme.colors.text}
        selectedValue={field.value}
        itemStyle={{height: 150}}
        onValueChange={(itemValue) => {
          if(name === 'categoryId') {
            setActualCategory(allCategories.find(cat => cat.id === itemValue) || null)
          }
          helpers.setValue(itemValue)}
        }
      >
        <Picker.Item 
          label={`Elegir ${name === 'categoryId' ? 'categoría' : 'subcategoría'}`}
          value='-'
          enabled={false}
          color={theme.disable}
        />
        {options.map(opt => (
          <Picker.Item
            key={opt.id}
            label={opt.name} 
            value={opt.id}
            color={theme.colors.text}
          />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  label: {
    flex:1
  },
  pickerContainer: {
    flex: 2
  }
})