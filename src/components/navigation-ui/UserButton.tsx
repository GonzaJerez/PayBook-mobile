import {TouchableOpacity, StyleSheet} from 'react-native'
import React, {useContext} from 'react'
import {Ionicons} from '@expo/vector-icons'
import {ThemeContext} from '../../context/theme/ThemeContext'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {PrivateStackNavigation} from '../../navigation/PrivateNavigation'

export const UserButton = () => {

  const {theme} = useContext(ThemeContext)
  const {navigate} = useNavigation<NativeStackNavigationProp<PrivateStackNavigation>>()

  return (
    <TouchableOpacity
      onPress={()=>navigate('UserNavigation')}
      style={[styles.buttonUser, {backgroundColor: theme.separator}]}
    >
      <Ionicons
        name="person-sharp"
        size={20}
        style={styles.iconUser}
        color={theme.colors.text}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonUser: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    // right: 15
  },
  iconUser: {
    marginLeft: 2
  },
})