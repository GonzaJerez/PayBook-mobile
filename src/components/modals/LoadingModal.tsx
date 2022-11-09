import React, {useContext} from 'react'
import {View, Text, Modal, StyleSheet, ActivityIndicator} from 'react-native'

import {ThemeContext} from '../../context/theme/ThemeContext'

export const LoadingModal = () => {

  const {theme} = useContext(ThemeContext)

  return (
    <Modal
      transparent
      visible
    >
      <View style={[styles.container, {backgroundColor: theme.backgroundModal}]}>
        <ActivityIndicator 
          color={theme.colors.primary}
          size={70}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },

})