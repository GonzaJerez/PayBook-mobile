import {useRef, useState} from "react";
import {Animated} from "react-native";

export const useSideMenuAnimation = ()=>{

  const right = useRef(new Animated.Value(-100)).current;
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openMenu = () => {
    setIsModalOpen(true)
    Animated.timing(right, {
      toValue: 0,
      useNativeDriver: false,
      duration: 600
    }).start()
  }

  const closeMenu = () => {
    Animated.timing(right, {
      toValue: -500,
      useNativeDriver: false,
      duration: 300
    }).start(() => {
      setIsModalOpen(false)
    })
  }

  return {
    right,
    isModalOpen,
    openMenu,
    closeMenu
  }
}