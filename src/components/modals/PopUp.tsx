import React, {useContext} from 'react'
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native'

import {ThemeContext} from '../../context/theme/ThemeContext'

interface Props {
  children: JSX.Element | JSX.Element[];
  isPopupOpen: boolean;
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopUp = ({children, isPopupOpen, right, bottom, left, top, setIsPopupOpen}: Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <Modal
      animationType='fade'
      transparent
      visible={isPopupOpen}
    >
      <TouchableWithoutFeedback
        onPress={() => setIsPopupOpen(false)}
      >

        <View style={styles.backgroundPopup}>

          <View
            style={[
              styles.optionsPopupContainer,
              {
                backgroundColor: theme.colors.card,
                shadowColor: theme.shadow,
                right,
                left,
                top,
                bottom
              }
            ]}
          >
            {children}
          </View>

        </View>

      </TouchableWithoutFeedback>

    </Modal>

  )
}

const styles = StyleSheet.create({
  backgroundPopup: {
    flex: 1,
  },
  optionsPopupContainer: {
    // width: 150,
    borderRadius: 10,
    position: 'absolute',
    paddingVertical: 10,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 5
  },
})