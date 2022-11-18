import {useContext, useState} from 'react'
import {passwordRecoveryApi, renewPasswordApi, validateSecurityCodeApi} from '../api/auth-apis'
import {RequestsStatusContext} from '../context/requests-status/RequestsStatusContext'
import {ForgotPasswordResponse} from '../interfaces/Auth'

export const useRecoveryAccount = ()=>{

  const {showNotification, handleConnectionFail} = useContext(RequestsStatusContext)

  const [isLoading, setIsLoading] = useState(false)

  const passwordRecovery = async (email:string) => {
    setIsLoading(true)
    try {
      const resp:ForgotPasswordResponse = await passwordRecoveryApi({email})

      if (resp.error) {
        return resp.message
      }
      
    } catch (error) {
      handleConnectionFail()
    }
    finally {
      setIsLoading(false)
    }
  }

  const validateSecurityCode = async (email:string, code: string) => {
    setIsLoading(true)
    try {
      const resp:ForgotPasswordResponse = await validateSecurityCodeApi({email, code})
      if (resp.error) {
        return resp.message;
      }
      
    } catch (error) {
      handleConnectionFail()
    }
    finally {
      setIsLoading(false)
    }
  }

  const renewPassword = async (email:string, password: string) => {
    setIsLoading(true)
    try {
      const resp:ForgotPasswordResponse = await renewPasswordApi({email, password})
      if (resp.error) {
        return resp.message;
      } else {
        showNotification('Contraseña actualizada')
      }

    } 
    catch (error) {
      handleConnectionFail()
    }
    finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    passwordRecovery,
    validateSecurityCode,
    renewPassword
  }
}