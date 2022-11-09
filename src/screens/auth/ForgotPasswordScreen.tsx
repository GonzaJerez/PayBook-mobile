import React from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {View, StyleSheet} from 'react-native'

import {FooterBrand} from '../../components/brand/FooterBrand'
import {Title} from '../../components/texts/Title'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'
import {ForgotPasswordForm} from '../../components/form/ForgotPasswordForm'

interface Props extends NativeStackScreenProps<AuthStackNavigator, 'ForgotPasswordScreen'> {}

export const ForgotPasswordScreen = ({navigation}: Props) => {

  return (
    <View style={styles.container}>

      <View style={styles.formContainer}>
        <Title 
          label='Ingrese su email para recuperar su contraseña'
          size='medium'
          style={{marginBottom:20}}
        />

        <ForgotPasswordForm navigation={navigation} />

      </View>

      <FooterBrand hasScreenHeader/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:30,
  },
  formContainer:{
    marginTop: 80,
  },
})