import {Text} from 'react-native'
import React, {useContext} from 'react'
import {ThemeContext} from '../../context/theme/ThemeContext'

export const DisableText = ({children}: {children: string}) => {

  const {theme} = useContext(ThemeContext)

  return (
    <Text style={{color:theme.disable}}>{children}</Text>
  )
}
