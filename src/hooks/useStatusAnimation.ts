import {useEffect, useRef} from "react"
import {Animated} from "react-native"

interface Props {
  isLoading: boolean;
  hideStatus: () => void;
}


export const useStatusAnimation = ({isLoading, hideStatus}: Props) => {

  const bottom = useRef(new Animated.Value(-200)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const opacityResult = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(bottom, {
      toValue: 50,
      useNativeDriver: false,
      duration: 500
    }).start()
  }, [])

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        useNativeDriver: false,
        duration: 500,
        delay:300
      }),
      Animated.timing(bottom, {
        toValue: -200,
        useNativeDriver: false,
        duration: 500,
        delay: 3000
      })
    ]).start(({finished}) => {
      if (finished) hideStatus()
    })
  }, [isLoading])

  const showStatusResult = () => {
    Animated.timing(opacityResult, {
      toValue: 1,
      useNativeDriver: false,
      duration: 300,
      delay: 500
    }).start()
  }

  return {
    bottom,
    opacity,
    opacityResult,
    showStatusResult
  }

}
