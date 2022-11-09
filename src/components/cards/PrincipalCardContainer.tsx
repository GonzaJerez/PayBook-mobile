import {View, StyleSheet, Dimensions} from 'react-native'
import React, {useContext} from 'react'
import {ThemeContext} from '../../context/theme/ThemeContext'



interface Props {
  children: JSX.Element | JSX.Element[];
  size?: 'small' | 'medium' | 'big'
}

const WIDTH_SCREEN = Dimensions.get('screen').width

export const PrincipalCardContainer = ({children, size}: Props) => {

  const {theme} = useContext(ThemeContext)

  let width = WIDTH_SCREEN - 50;
  if (size === 'small') width = WIDTH_SCREEN - 100
  if (size === 'big') width = WIDTH_SCREEN + 20

  return (
    <View
      style={[styles.cardCarousel, {backgroundColor: theme.colors.card, width, shadowColor:theme.shadow}]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  cardCarousel: {
    flex: 1,
    padding:20,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 5
  },
})