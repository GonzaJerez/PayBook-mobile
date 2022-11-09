import React, {useContext} from 'react'
import {TouchableOpacity, StyleSheet } from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {ThemeContext} from '../../context/theme/ThemeContext'
import {PrivateStackNavigation} from '../../navigation/PrivateNavigation'

export const AccountInfoButton = () => {

  const {theme:{colors}} = useContext(ThemeContext)
  const {navigate} = useNavigation<NativeStackNavigationProp<PrivateStackNavigation>>()

  return (
    <TouchableOpacity
      onPress={()=>navigate('AccountNavigation',{screen:'AccountInfoScreen'})}
    >
      <Ionicons
        name="information-circle-outline"
        size={30}
        style={styles.icon}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginRight:20
  }
})