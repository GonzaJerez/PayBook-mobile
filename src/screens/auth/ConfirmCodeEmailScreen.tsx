import React from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {View, StyleSheet} from 'react-native'

import {FooterBrand} from '../../components/brand/FooterBrand'
import {ConfirmCodeForm} from '../../components/form/ConfirmCodeForm'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'

interface Props extends NativeStackScreenProps<AuthStackNavigator,'ConfirmCodeEmailScreen'>{}

export const ConfirmCodeEmailScreen = ({navigation,route}:Props) => {

  const {email} = route.params

  return (
    <View style={styles.container}>

      <View style={styles.formContainer}>
        <ConfirmCodeForm navigation={navigation} email={email}/>
      </View>

      <FooterBrand hasScreenHeader/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center'
  },
  formContainer: {
    marginTop: 80,
    alignItems: 'center'
  },
})