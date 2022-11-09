import React from 'react'
import {View, Modal, TouchableWithoutFeedback, Animated} from 'react-native'

import {FiltersMenu} from '../menus/FiltersMenu';


interface Props {
  isModalOpen: boolean;
  onPressOut: ()=>void;
  right: Animated.Value
}

export const FiltersModal = ({isModalOpen,onPressOut,right}:Props) => {

  return (
    <Modal
      transparent
      animationType='fade'
      visible={isModalOpen}
    >
      <View style={{flex: 1, flexDirection: 'row'}}>

        <TouchableWithoutFeedback
          onPress={onPressOut}
        >
          <View style={{flex: 1}} />
        </TouchableWithoutFeedback>

        <FiltersMenu right={right}/>

      </View>

    </Modal>
  )
}
