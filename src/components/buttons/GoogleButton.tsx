import React from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'

import {useGoogleAuth} from '../../hooks/useGoogleAuth';
import {ErrorRequest} from '../texts/ErrorRequest';



export const GoogleButton = () => {

  const {error, activateGoogleAuth} = useGoogleAuth()

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={()=>activateGoogleAuth()}
          style={{...styles.googleButton, backgroundColor: '#fafafa', shadowColor: '#aaa'}}
        >
          <Image
            style={{...styles.googleIcon}}
            source={require('../../../assets/imgs/logo-google.png')}
          />
          <Text style={styles.googleText}>Ingresar con Google</Text>
        </TouchableOpacity>
      </View>
      {(error) && (<ErrorRequest>{error}</ErrorRequest>)}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  googleButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  googleText: {
    color: '#888',
    fontWeight: '600',
    textAlignVertical: 'center'
  },
  googleIcon: {
    height: 30,
    width: 30,
    marginRight: 10,
  }
})