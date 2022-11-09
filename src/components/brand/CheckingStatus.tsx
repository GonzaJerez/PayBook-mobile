import React, {useContext, useEffect, useRef} from 'react'
import { View, Text, StyleSheet, Image, Animated } from 'react-native'
import Constants from 'expo-constants';

import {InfoApp} from '../../constants/InfoApp'
import {ThemeContext} from '../../context/theme/ThemeContext';
import {Title} from '../texts/Title';


const VERSION_APP = Constants?.manifest?.version;
const NAME_APP = Constants?.manifest?.name;


export const CheckingStatus = () => {

  const {theme} = useContext(ThemeContext)

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    Animated.timing(opacity,{
      toValue: 1,
      useNativeDriver: true,
      duration: 500
    }).start()
  },[])

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Image 
        source={require('../../../assets/imgs/logo-app.png')}
        style={styles.image}
      />
      <Animated.View style={{opacity}}>
        <Title 
          style={[styles.nameApp]}
          label={NAME_APP || ''}
          size='big'
        />
      </Animated.View>
      <Animated.View style={[styles.infoAppContainer, {opacity}]}>
        <Text style={{color:theme.ligthText}}>Version {VERSION_APP}</Text>
        <Text style={{color:theme.ligthText}}>{InfoApp.email}</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop:70,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  image:{
    width:220,
    height:88
  },
  nameApp:{
    // position:'absolute',
    // paddingBottom:20
  },
  infoAppContainer:{
    position:'absolute',
    bottom:0,
    alignItems:'center'
  }
})