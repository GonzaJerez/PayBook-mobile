import React, {useEffect} from 'react'
import {Text, StyleSheet, Animated} from 'react-native'
import LottieView from 'lottie-react-native';


interface Props{
  showStatusResult: () => void;
  opacityResult: Animated.Value;
  label: string;
}

export const PositiveStatus = ({opacityResult, label, showStatusResult}:Props) => {

  useEffect(()=>{
    showStatusResult()
  },[])

  return (
    <Animated.View style={[styles.rowContainer,{opacity:opacityResult}]}>
      <Text style={styles.label}>{label}</Text>
      <LottieView
        autoPlay
        loop={false}
        style={{
          width: 40,
          height: 40,
        }}
        source={require('../../../assets/animations/positive-status.json')}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  rowContainer:{
    position:'absolute', 
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  label: {
    fontSize:16,
    fontWeight:'500'
  }
})