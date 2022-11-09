import React  from 'react'
import {View} from 'react-native'

import {FiltersButton} from '../buttons/FiltersButton';
import {FiltersModal} from '../modals/FiltersModal';
import {useSideMenuAnimation} from '../../hooks/useSideMenuAnimation';



export const Filters = () => {

  const {isModalOpen,right,closeMenu,openMenu} = useSideMenuAnimation()

  return (
    <View>

      <FiltersButton
        onPress={openMenu} 
      />

      <FiltersModal 
        isModalOpen={isModalOpen}
        onPressOut={closeMenu}
        right={right}
      />
      
    </View>
  )
}
