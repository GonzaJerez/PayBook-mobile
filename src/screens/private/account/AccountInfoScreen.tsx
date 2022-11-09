import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useEffect} from 'react'
import {ScrollView, StyleSheet } from 'react-native'
import {OptionsButton} from '../../../components/buttons/OptionsButton'
import {AccountInfoList} from '../../../components/lists/AccountInfoList'
import {useAccountActions} from '../../../hooks/useAccountActions'
import {AccountStackNavigation} from '../../../navigation/AccountNavigation'

interface Props extends NativeStackScreenProps<AccountStackNavigation,'AccountInfoScreen'>{}

export const AccountInfoScreen = ({navigation}:Props) => {

  const {showAlertDelete,showAlertLeave} = useAccountActions()

  const options = [
    {
      label: 'Abandonar cuenta',
      onPress: showAlertLeave,
      icon: 'exit-outline'
    },
    {
      label: 'Eliminar cuenta',
      onPress: showAlertDelete,
      icon: 'trash-outline'
    },
  ]

  useEffect(()=>{
    navigation.setOptions({
      headerRight: ()=>(
        <OptionsButton 
        options={options}
      />
      )
    })
  },[])

  return (
    <ScrollView style={styles.container}>
      <AccountInfoList />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})