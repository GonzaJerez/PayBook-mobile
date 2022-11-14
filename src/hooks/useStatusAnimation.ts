import {useEffect, useRef} from "react"
import {Animated} from "react-native"

interface Props {
  hideNotification: () => void;
}


export const useStatusAnimation = ({hideNotification}: Props) => {

  const bottom = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(bottom, {
        toValue: 50,
        useNativeDriver: false,
        duration: 500
      }),
      Animated.timing(bottom, {
        toValue: -200,
        useNativeDriver: false,
        duration: 500,
        delay: 3000
      })
    ]).start(({finished}) => {
      if (finished) hideNotification()
    })
  }, [])

  return {
    bottom,
  }
}
