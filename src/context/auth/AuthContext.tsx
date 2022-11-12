import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useReducer} from 'react';
import {Platform} from 'react-native';
import {checkPremiumApi, checkTokenApi, googleLoginApi, loginApi, registerApi} from '../../api/auth-apis';
import {deleteUserApi, premiumUserApi, removePremiumUserApi, updateUserApi} from '../../api/users-apis';
import {LoginUser} from '../../interfaces/Auth';
import {CreateUser, UpdateUser, UserResponse} from '../../interfaces/User';
import {RequestsStatusContext} from '../requests-status/RequestsStatusContext';

import {AuthReducer, AuthState} from './AuthReducer';


interface AuthContextProps extends AuthState {
  login: (body: LoginUser) => Promise<void>;
  googleSignIn: (tokenGoogle: string) => Promise<void>;
  register: (body: CreateUser) => Promise<void>;
  updateUser: (body: UpdateUser) => Promise<void>;
  deleteUser: () => Promise<void>;
  logout: () => Promise<false | undefined>;
  // logout: () => Promise<void>;
  becomePremiumUser: (revenue_id: string) => Promise<void>;
  removePremiumUser: () => Promise<void>;
  checkPremium: () => Promise<void>;
  cleanErrors: () => void;
}



export const initialState: AuthState = {
  user: null,
  token: null,
  status: 'checking',
  isConnectionFailed: false,
  error: null
}



export const AuthContext = createContext({} as AuthContextProps)



export const AuthProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {

  const {showStatus, setSuccessStatus, startLoading, finishLoading, handleConnectionFail} = useContext(RequestsStatusContext)

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  useEffect(() => {
    checkToken()
  }, [])


  const checkToken = async () => {
    const tokenStored = await AsyncStorage.getItem('token') || '';
    if (!tokenStored) logout();

    try {
      const resp: UserResponse = await checkTokenApi(tokenStored)
      if (!resp.user) return logout()

      await AsyncStorage.setItem('token', resp.token)

      dispatch({type: 'login', payload: resp})

    } catch (error) {
      handleConnectionFail()
    }
  }


  const login = async (body: LoginUser) => {
    startLoading()
    try {
      const resp: UserResponse = await loginApi(body)

      if (!existError(resp)) {
        dispatch({type: 'login', payload: resp})
        await AsyncStorage.setItem('token', resp.token)
      }
    }
    catch (error) {
      handleConnectionFail();
    }
    finally {
      finishLoading()
    }
  }


  const googleSignIn = async (tokenGoogle: string) => {
    startLoading()
    try {
      const resp: UserResponse = await googleLoginApi(tokenGoogle)

      if (!existError(resp)) {
        dispatch({type: 'login', payload: resp})
        await AsyncStorage.setItem('token', resp.token)
      }
    }
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }


  const register = async (body: CreateUser) => {
    startLoading()
    try {
      const resp: UserResponse = await registerApi(body);

      if (!existError(resp)) {
        dispatch({type: 'login', payload: resp})
        await AsyncStorage.setItem('token', resp.token)
      }
    }
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }


  const logout = async () => {
    dispatch({type: 'logout'})

    try {
      await AsyncStorage.removeItem('token')
    } catch (error) {
      return false;
    }

    // if(Platform.OS === 'ios'){
    //   await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
    // }
    // if(Platform.OS === 'android') await AsyncStorage.clear()
  }


  const updateUser = async (body: UpdateUser) => {
    if (!state.user || !state.token) return;
    showStatus({
      failureMessage: 'No se pudo actualizar correctamente',
      successMessage: 'Usuario actualizado',
      loadingMessage: 'Actualizando...'
    })

    try {
      const resp: UserResponse = await updateUserApi(body, state.user?.id, state.token)
      if (!existError(resp)) {
        dispatch({type: 'updateUser', payload: {user: resp.user}})
        setSuccessStatus()
      }
    }
    catch (error) {
      handleConnectionFail()
    }
  }


  const deleteUser = async () => {
    if (!state.user || !state.token) return;
    showStatus({
      failureMessage: 'No se pudo eliminar el usuario',
      successMessage: 'Usuario eliminado',
      loadingMessage: 'Eliminando usuario'
    })

    try {
      const resp: UserResponse = await deleteUserApi(state.user?.id, state.token)
      if (!existError(resp)) {
        logout()
        setSuccessStatus()
      }
    }
    catch (error) {
      handleConnectionFail()
    }
  }

  const becomePremiumUser = async (revenue_id:string) => {
    if (!state.user || !state.token) return;
    showStatus({
      failureMessage: 'Ocurrio un error en la actualización',
      successMessage: 'Ahora sos un usuario premium!',
      loadingMessage: 'Actualizando a premium'
    })

    try {
      const resp: UserResponse = await premiumUserApi(state.user?.id, state.token, {revenue_id})
      if (!existError(resp)) {
        setSuccessStatus()
        dispatch({type: 'updateUser', payload: {user: resp.user}})
      }
    }
    catch (error) {
      handleConnectionFail()
    }
  }

  const removePremiumUser = async () => {
    if (!state.user || !state.token) return;
    showStatus({
      failureMessage: 'Removiendo permisos',
      successMessage: 'Dejaste de ser un usuario premium!',
      loadingMessage: 'Ocurrio un error en la actualización'
    })

    try {
      const resp : UserResponse= await removePremiumUserApi(state.user?.id, state.token)
      if (!existError(resp)) {
        setSuccessStatus()
        dispatch({type: 'updateUser', payload: {user: resp.user}})
      }
    }
    catch (error) {
      handleConnectionFail()
    }
  }


  const checkPremium = async () => {
    if(!state.token) return ;
    try {
      const resp: UserResponse = await checkPremiumApi(state.token)
      if (!existError(resp)) {
        dispatch({type: 'updateUser', payload: {user: resp.user}})
      }
      
    } catch (error) {
      handleConnectionFail()
    }
  }

  const existError = (resp: UserResponse) => {
    let existError = false;
    if (resp.statusCode !== 200 && resp.message) {
      dispatch({type: 'setError', payload: resp.message})
      existError = true;
    }
    return existError;
  }


  const cleanErrors = () => {
    dispatch({type: 'cleanErrors'})
  }


  return (
    <AuthContext.Provider
      value={{
        ...state,
        cleanErrors,
        login,
        googleSignIn,
        logout,
        register,
        updateUser,
        deleteUser,
        becomePremiumUser,
        removePremiumUser,
        checkPremium
      }}>
      {children}
    </AuthContext.Provider>
  )
}