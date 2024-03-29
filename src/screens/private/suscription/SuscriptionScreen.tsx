import React, {useContext, useEffect, useState} from 'react'
import {View, Text, Platform, StyleSheet, ScrollView, RefreshControl} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Purchases, {PurchasesPackage} from 'react-native-purchases';
import Constants from 'expo-constants';
import {A} from '@expo/html-elements';

import {InfoApp} from '../../../constants/InfoApp';
import {AuthContext} from '../../../context/auth/AuthContext';
import {ThemeContext} from '../../../context/theme/ThemeContext';
import {PremiumSuscriptionCard} from '../../../components/cards/PremiumSuscriptionCard';
import {externalLinks} from '../../../constants/ExternalLinks';
import {ValidRoles} from '../../../interfaces/ValidRoles';
import {PrivateStackNavigation} from '../../../navigation/PrivateNavigation';
import {EmptyData} from '../../../components/texts/EmptyData';

const REVENUE_API_KEY = Constants?.manifest?.extra?.revenueApiKey


interface Props extends NativeStackScreenProps<PrivateStackNavigation, 'SuscriptionScreen'> {}


export const SuscriptionScreen = ({navigation, route}: Props) => {

  const {theme} = useContext(ThemeContext)
  const {user, becomePremiumUser, checkPremium} = useContext(AuthContext)

  const [currentOffering, setCurrentOffering] = useState<PurchasesPackage[] | null>(null);
  const [isSubscriptionActiveForOtherUser, setIsSubscriptionActiveForOtherUser] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const {tryToCreateNewAccount = false} = route.params;


  const getInfoSubscription = async () => {
    // Configuracion inicial para Revenue
    Purchases.setDebugLogsEnabled(true)
    if (Platform.OS == 'android') {
      Purchases.configure({apiKey: REVENUE_API_KEY})
    }

    try {
      // Recupera las compras del usuario de Play Store actual
      const res = await Purchases.restorePurchases()

      // Valida si ya existe una suscripcion activa para el usuario de Play Store actual
      if (res.entitlements.active[InfoApp.premium_entitlement_id] && !res.entitlements.active[InfoApp.premium_entitlement_id].unsubscribeDetectedAt) {
        setIsSubscriptionActiveForOtherUser(true)
      } else {
        setIsSubscriptionActiveForOtherUser(false)
      }

      // Recupera suscripciones disponibles
      const offerings = await Purchases.getOfferings();
      setCurrentOffering(offerings.current?.availablePackages || []);

    } catch (error) {
      console.log(error);
    }
    finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    if(!user?.roles.includes(ValidRoles.SUPER_USER)){
      getInfoSubscription()
        .catch(console.log);
    }
  }, [])


  const onSuscriptionSelect = async () => {
    if (!currentOffering) return;
    try {
      // Realizar suscripcion con Revenue
      const resp = await Purchases.purchasePackage(currentOffering[0])

      // Si la compra se realiza correctamente
      if (resp.customerInfo.entitlements.active[InfoApp.premium_entitlement_id]) {
        const errorMessage = await becomePremiumUser(resp.customerInfo.originalAppUserId)
        if(!errorMessage){
          if(tryToCreateNewAccount){
            navigation.replace('AccountNavigation',{screen:'NewAccountNavigation'})
          } else {
            navigation.goBack()
          }
        }
      }
    }
    catch (error: any) {
      if (!error.userCancelled) {
        console.log(error);
      }
    }
  }

  if(user?.roles.includes(ValidRoles.SUPER_USER)){
    return (
      <View style={styles.containerSuperUser}>
        <EmptyData text='Actualmente eres un "Super Usuario" de PayBook, tienes todos los beneficios de los usuarios premium de manera gratuita!'/>
      </View>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={async () => {
            setIsRefreshing(true)
            await checkPremium()
            getInfoSubscription();
          }}
          progressBackgroundColor={theme.colors.card}
          colors={[theme.colors.primary]}
        />
      }
    >
      {(!user?.roles.includes(ValidRoles.USER_PREMIUM) && (
        <Text style={[styles.infoText, {color:theme.ligthText}]}>Actualmente solo puedes tener una sola cuenta de gastos. Para poder crear o unirte a más cuentas debes ser un usuario Premium.</Text>
      ))}
      <PremiumSuscriptionCard
        currentProduct={(currentOffering) && currentOffering[0].product}
        isSubscriptionActiveForOtherUser={isSubscriptionActiveForOtherUser}
        onSuscriptionSelect={onSuscriptionSelect}
        isSuscribed={user?.roles.includes(ValidRoles.USER_PREMIUM)}
      />
      {(isSubscriptionActiveForOtherUser && !user?.roles.includes(ValidRoles.USER_PREMIUM)) && (
        <View style={styles.errorDetails}>
          <Text
            style={[styles.disclaimerText, {color: theme.ligthText}]}
          >
            Hay otra suscripción activa usando la misma cuenta de Play Store y no es posible crear una nueva suscipción. Para solucionar esto recomendamos algunos de los siguientes items:
          </Text>
          <Text
            style={[styles.disclaimerText, styles.errorItem, {color: theme.ligthText}]}
          >
            * Instalar la app en un nuevo dispositivo desde la cuenta de Play Store deseada.
          </Text>
          <Text
            style={[styles.disclaimerText, styles.errorItem, {color: theme.ligthText}]}
          >
            * Desinstalar la app, ingresar con la cuenta deseada a la Play Store y desde esa cuenta volver a descargar la app.
          </Text>
          <Text
            style={[styles.disclaimerText, styles.errorItem, {color: theme.ligthText}]}
          >
            * <A
              href={externalLinks.manageSuscriptions}
              style={{color: theme.colors.primary}}
            >
              Cancelar la suscipción actual
            </A> y volver a suscribirse desde esta nueva cuenta (esto puede demorar algunos minutos).
          </Text>
        </View>
      )}
      {(user?.roles.includes(ValidRoles.USER_PREMIUM)) && (
        <View style={styles.errorDetails}>
          <Text
            style={[styles.disclaimerText, {color: theme.ligthText}]}
          >
            * Tener en cuenta que al dar de baja el plan Premium se te eliminará de todas las cuentas que hayas creado o hayas ingresado quedando unicamente con la primera cuenta.
          </Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoText:{
    paddingHorizontal:20,
    marginTop:20
  },
  disclaimerText: {
    fontSize: 12
  },
  errorDetails: {
    paddingHorizontal: 20
  },
  errorItem: {
    paddingVertical: 5
  },
  containerSuperUser:{
    marginHorizontal:20
  }
})