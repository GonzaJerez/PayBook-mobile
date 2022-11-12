import React, {useContext} from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import Constants from 'expo-constants'

import {ThemeContext} from '../../context/theme/ThemeContext'

interface Props {
  hasScreenHeader?: boolean
}

const HEIGHT_SCREEN = Dimensions.get('window').height
const VERSION_APP = Constants?.manifest?.version
const NAME_APP = Constants?.manifest?.name

export const FooterBrand = ({hasScreenHeader}:Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <View style={[styles.container, {top: (hasScreenHeader) ? HEIGHT_SCREEN - 160 : HEIGHT_SCREEN - 70}]}>
      <Image 
        source={require('../../../assets/imgs/logo-app.png')}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={[styles.text, {color:theme.disable}]}>{NAME_APP}</Text>
      <Text style={[styles.version,{color:theme.disable}]}>Versión {VERSION_APP}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    alignSelf:'center',
    alignItems:'center',
  },
  image:{
    width:125, 
    height:50, 
    opacity:0.5
  },
  text:{
    fontSize: 22,
    fontWeight: '700'
  },
  version:{
    fontSize:12
  }
})