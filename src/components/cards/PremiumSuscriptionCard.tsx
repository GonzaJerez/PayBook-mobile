import React, {useContext} from 'react'
import {Ionicons} from '@expo/vector-icons'
import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native'

import {ThemeContext} from '../../context/theme/ThemeContext'
import {DefaultSeparator} from '../separators/DefaultSeparator'
import {Title} from '../texts/Title'
import {PurchasesStoreProduct} from 'react-native-purchases'
import {A} from '@expo/html-elements'
import {externalLinks} from '../../constants/ExternalLinks'


interface Props {
  currentProduct: PurchasesStoreProduct | null;
  isSuscribed?: boolean;
  isSubscriptionActiveForOtherUser?: boolean;
  onSuscriptionSelect?: () => Promise<void>
}

export const PremiumSuscriptionCard = ({currentProduct, isSuscribed = false, isSubscriptionActiveForOtherUser, onSuscriptionSelect}: Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <View style={[styles.cardContainer, {backgroundColor: theme.colors.card, shadowColor: theme.shadow}]}>
      {(!currentProduct)
        ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              color={theme.colors.primary}
              size={50}
            />
            <Text style={{color: theme.ligthText}}>Cargando planes...</Text>
          </View>
        )
        : (
          <>

            <Title
              label='Plan premium'
              size='big'
              style={styles.titleCard}
            />
            <DefaultSeparator marginVertical={20} />
            <View style={styles.featuresContainer}>
              <View style={styles.featureTitle}>
                <Ionicons
                  name='checkmark-sharp'
                  size={20}
                  color={theme.colors.primary}
                  style={styles.checkIcon}
                />
                <Text style={{color: theme.colors.text}}>Cuentas ilimitadas</Text>
              </View>
              <Text style={[styles.featureDescription, {color: theme.ligthText}]}>Permite crear y sumarse a cuentas de terceros ilimitadamente</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={[styles.priceText, {color: theme.colors.text}]}>{(currentProduct) && currentProduct.priceString}</Text>
              <Text style={[styles.currencyCode, {color: theme.colors.text}]}>{(currentProduct) && currentProduct.currencyCode} / mes</Text>
            </View>
            <View style={styles.disclaimerContainer}>
              <Text
                style={[styles.disclaimerText, {color: theme.ligthText}]}
              >
                {`* ${(currentProduct) && currentProduct.priceString + ' ' + currentProduct.currencyCode} mensual.`}
              </Text>
              <Text
                style={[styles.disclaimerText, {color: theme.ligthText}]}
              >
                *Puede cancelar la suscripción desde la Play Store en cualquier momento.
              </Text>
            </View>
            {(!isSuscribed)
              ? (
                <TouchableOpacity
                  style={[
                    styles.suscriptionButton,
                    {
                      backgroundColor: theme.colors.primary,
                      opacity: (isSubscriptionActiveForOtherUser) ? 0.5 : 1
                    }
                  ]}
                  onPress={onSuscriptionSelect}
                  disabled={isSubscriptionActiveForOtherUser}
                >
                  <Text style={[styles.buttonText, {color: theme.colors.card}]}>Suscribirme</Text>
                </TouchableOpacity>
              )
              : (
                <>
                  <A
                    href={externalLinks.manageSuscriptions}
                    style={[
                      styles.suscriptionButton,
                      {
                        backgroundColor: theme.delete,
                      }
                    ]}
                  >
                    <Text style={[styles.buttonText, {color: theme.colors.card}]}>Cancelar suscripción</Text>
                  </A>
                  <Text
                    style={[styles.disclaimerText, styles.advertisementCancel, {color: theme.ligthText}]}
                  >
                    * Esta operación puede demorar algunos minutos.
                  </Text>
                </>
              )
            }
          </>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'center',
    width: '80%',
    minHeight: 450,
    paddingVertical: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: '5%',
    paddingHorizontal: 30,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 5
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  titleCard: {
    marginBottom: 0
  },
  featuresContainer: {
    alignSelf: 'flex-start'
  },
  featureTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  featureDescription: {
    paddingLeft: 30,
    fontSize: 13
  },
  checkIcon: {
    marginRight: 5
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30
  },
  priceText: {
    fontSize: 40,
    fontWeight: '500',
  },
  currencyCode: {
    marginLeft: 10,
  },
  disclaimerContainer: {
    alignSelf: 'flex-start',
  },
  disclaimerText: {
    fontSize: 12
  },
  suscriptionButton: {
    marginTop: 50,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 30
  },
  buttonText: {
    fontSize: 20
  },
  advertisementCancel:{
    fontSize:10,
    marginTop:5
  }
})