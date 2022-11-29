import React, {useContext, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {PopUp} from '../modals/PopUp'
import {PopupOption} from '../item-lists/PopupOption'
import {ThemeContext} from '../../context/theme/ThemeContext'
import {PrivateStackNavigation} from '../../navigation/PrivateNavigation'
import {AccountsContext} from '../../context/accounts/AccountsContext'
import {AuthContext} from '../../context/auth/AuthContext'
import {ValidRoles} from '../../interfaces/ValidRoles'
import {MAX_ACCOUNTS_FREE} from '../../constants/ContantsAccounts'

export const AccountPicker = () => {

  const {navigate} = useNavigation<NativeStackNavigationProp<PrivateStackNavigation>>()

  const {theme: {colors}} = useContext(ThemeContext)
  const {actualAccount, isLoading, allAccounts, changeActualAccount} = useContext(AccountsContext)
  const {user} = useContext(AuthContext)

  const [isPopupOpen, setIsPopupOpen] = useState(false)


  const toCreateAccount = () => {
    setIsPopupOpen(false)
    if(allAccounts.length >= MAX_ACCOUNTS_FREE && user?.roles.includes(ValidRoles.USER)){
      navigate('SuscriptionScreen', {tryToCreateNewAccount: true})
    } else {
      navigate('AccountNavigation', {screen: 'NewAccountNavigation'})
    }
  }

  const toChangeAccount = (accountId: string) => {
    setIsPopupOpen(false)
    changeActualAccount(accountId)
  }

  return (
    <View style={styles.accountPickerContainer}>

      <TouchableOpacity
        style={styles.accountActualButton}
        onPress={() => setIsPopupOpen(true)}
      >
        <Text style={[styles.accountActualText]}>{actualAccount?.name || ((isLoading) ? 'Cargando cuentas...' : 'Sin cuenta')}</Text>
        <Ionicons
          name="chevron-down-outline"
          size={20}
        />
      </TouchableOpacity>

      <PopUp
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        top={50}
        left={30}
      >
        <>
          {
            allAccounts?.map(account => (
              <PopupOption
                key={account?.id}
                onPress={() => toChangeAccount(account?.id)}
              >
                <Text style={[styles.accountPickerOptionsText,{color:colors.text}]}>{account?.name}</Text>
              </PopupOption>
            ))
          }

          <PopupOption
            onPress={toCreateAccount}
          >
            <Text style={[styles.accountPickerOptionsText, {color:colors.text}]}>Nueva cuenta</Text>
            <Ionicons
              name='add-circle-outline'
              size={20}
              color={colors.text}
            />
          </PopupOption>
        </>
      </PopUp>

    </View>
  )
}

const styles = StyleSheet.create({
  accountPickerContainer: {

  },
  accountActualButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  accountActualText: {
    fontWeight: '500',
    fontSize: 18
  },
  accountPickerOptionsText: {
    fontSize: 18,
    paddingLeft: 10,
    marginRight: 5
  },
})