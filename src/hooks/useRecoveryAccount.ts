import {useContext, useState} from 'react'
import {passwordRecoveryApi, renewPasswordApi, validateSecurityCodeApi} from '../api/auth-apis'
import {RequestsStatusContext} from '../context/requests-status/RequestsStatusContext'
import {ForgotPasswordResponse} from '../interfaces/Auth'

export const useRecoveryAccount = ()=>{

  const {handleConnectionFail, showStatus, setSuccessStatus, setFailureStatus} = useContext(RequestsStatusContext)

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const passwordRecovery = async (email:string) => {
    setIsLoading(true)
    try {
      const resp:ForgotPasswordResponse = await passwordRecoveryApi({email})

      if (resp.error) {
        setError(resp.message)
      } else {
        setError('');
      }

      return {error: resp.error}
      
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
        setError(resp.message)
      } else {
        setError('');
      }

      return {error: resp.error}
      
    } catch (error) {
      handleConnectionFail()
    }
    finally {
      setIsLoading(false)
    }
  }

  const renewPassword = async (email:string, password: string) => {
    showStatus({
      failureMessage: 'No se pudo actualizar la contraseña. Vuelve a intentarlo más tarde',
      loadingMessage: 'Actualizando...',
      successMessage: 'Contraseña actualizada.'
    })
    try {
      const resp:ForgotPasswordResponse = await renewPasswordApi({email, password})
      console.log(resp);
      
      if (!resp.error) {
        setSuccessStatus()
      } else {
        setError(resp.message)
        setFailureStatus()
      }

      return {error: resp.error}
      
    } catch (error) {
      handleConnectionFail()
    }
  }

  return {
    error,
    isLoading,
    passwordRecovery,
    validateSecurityCode,
    renewPassword
  }
}