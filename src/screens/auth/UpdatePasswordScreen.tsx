import React from 'react'
import {View, StyleSheet} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {FooterBrand} from '../../components/brand/FooterBrand'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'
import {UpdatePasswordForm} from '../../components/form/UpdatePasswordForm'

interface Props extends NativeStackScreenProps<AuthStackNavigator,'UpdatePasswordScreen'>{}

export const UpdatePasswordScreen = ({navigation, route}:Props) => {

  const {email} = route.params

  return (
    <View style={styles.container}>

      <View style={styles.form}>
        <UpdatePasswordForm navigation={navigation} email={email}/>
      </View>

      <FooterBrand hasScreenHeader/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  form: {
    paddingTop: 80
  }
})