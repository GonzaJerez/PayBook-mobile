import React, {useContext} from 'react'
import {StyleSheet, Animated} from 'react-native'

import {WaitingResultStatus} from './WaitingResultStatus';
import {PositiveStatus} from './PositiveStatus';
import {NegativeStatus} from './NegativeStatus';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useStatusAnimation} from '../../hooks/useStatusAnimation';
import {MessagesStatus, RequestsStatusContext} from '../../context/requests-status/RequestsStatusContext';


export const StatusNotification = ({failureMessage,loadingMessage,successMessage}:MessagesStatus) => {

  const {hideStatus, success, isLoading} = useContext(RequestsStatusContext)
  const {theme} = useContext(ThemeContext)

  const {
    bottom,
    opacity,
    opacityResult,
    showStatusResult
  } = useStatusAnimation({isLoading, hideStatus})

  return (
    <Animated.View
      style={[
        styles.container, {
          borderColor: theme.colors.primary, 
          backgroundColor: theme.colors.card,
          shadowColor: theme.shadow,
          bottom
        }
      ]}
    >
      <Animated.View style={[styles.rowContainer, {opacity}]}>
        <WaitingResultStatus 
          label={loadingMessage}  
        />
      </Animated.View>

      {(!isLoading && !success) && (
        <NegativeStatus
          label={failureMessage}
          showStatusResult={showStatusResult}
          opacityResult={opacityResult}
        />
      )}

      {(!isLoading && success) && (
        <PositiveStatus
          label={successMessage}
          showStatusResult={showStatusResult}
          opacityResult={opacityResult}
        />
      )}

    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    position: 'absolute',
    zIndex: 9999,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    alignSelf: 'center',
    // bottom: 50,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 5
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})