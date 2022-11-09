import {useContext, useEffect, useState} from 'react';
// Google
import * as WebBrowser from 'expo-web-browser';
import * as GoogleSignIn from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';

import {AuthContext} from '../context/auth/AuthContext';
import {Alert} from 'react-native';


const GOOGLE_EXPO_CLIENT = Constants?.manifest?.extra?.googleExpoId
const GOOGLE_IOS_CLIENT = Constants?.manifest?.extra?.googleIosId
const GOOGLE_ANDROID_CLIENT = Constants?.manifest?.extra?.googleAndroidId
WebBrowser.maybeCompleteAuthSession();


export const useGoogleAuth = () =>{

  const {googleSignIn} = useContext(AuthContext)
  const [statusGoogle, setStatusGoogle] = useState('')

  const [_request, response, promptAsync] = GoogleSignIn.useAuthRequest({
    expoClientId: GOOGLE_EXPO_CLIENT,
    androidClientId: GOOGLE_ANDROID_CLIENT,
    iosClientId: GOOGLE_IOS_CLIENT,
    selectAccount: true
  })

  useEffect(()=>{
    Alert.alert('type', response?.type)
    setStatusGoogle(response?.type || '')
    // if (response?.type === 'success') {
    //   const { authentication } = response;
      
    //   if (authentication?.accessToken) {
    //     Alert.alert('token', authentication.accessToken)
    //     googleSignIn(authentication?.accessToken);
    //   }
    // }
    if (response?.type === 'success') {
      const {access_token} = response.params
      googleSignIn(access_token);
      Alert.alert('token', access_token)
    }
  },[response])

  return {
    activateGoogleAuth: promptAsync,
    statusGoogle
  }
}