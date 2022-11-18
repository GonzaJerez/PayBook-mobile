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
  login: (body: LoginUser) => Promise<string | undefined>;
  googleSignIn: (tokenGoogle: string) => Promise<string | undefined>;
  register: (body: CreateUser) => Promise<string | undefined>;
  updateUser: (body: UpdateUser) => Promise<string | undefined>
  deleteUser: () => Promise<string | undefined>;
  logout: () => Promise<false | undefined>;
  // logout: () => Promise<void>;
  becomePremiumUser: (revenue_id: string) => Promise<string | undefined>;
  removePremiumUser: () => Promise<string | undefined>;
  checkPremium: () => Promise<string | undefined>;
}



export const initialState: AuthState = {
  user: null,
  token: null,
  status: 'checking',
  isConnectionFailed: false,
  isLoading: false
}


export const AuthContext = createContext({} as AuthContextProps)


export const AuthProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {

  const {showNotification ,handleConnectionFail} = useContext(RequestsStatusContext)

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
      if(resp.message){
        return resp.message
      } else {
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
      if(resp.message){
        return resp.message
      } else {
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
      if(resp.message) {
        return resp.message
      } else {
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
    startLoading()

    try {
      const resp: UserResponse = await updateUserApi(body, state.user?.id, state.token)
      if (resp.message) {
        if(resp.message?.endsWith('already exists.')){
          return 'El email ya se encuentra asociado a otra cuenta.';
        } else {
          return resp.message
        }
      } else {
        dispatch({type: 'updateUser', payload: {user: resp.user}})
        showNotification('Usuario actualizado')
      }
    }
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }


  const deleteUser = async () => {
    if (!state.user || !state.token) return;
    startLoading()

    try {
      const resp: UserResponse = await deleteUserApi(state.user?.id, state.token)
      if(resp.message){
        return resp.message
      } else {
        logout()
        showNotification('Usuario eliminado')
      }
    }
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }

  const becomePremiumUser = async (revenue_id:string) => {
    if (!state.user || !state.token) return;
    startLoading()

    try {
      const resp: UserResponse = await premiumUserApi(state.user?.id, state.token, {revenue_id})
      if(resp.error){
        return resp.message
      } else {
        dispatch({type: 'updateUser', payload: {user: resp.user}})
        showNotification('Usuario premium')
      }
    }
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }

  const removePremiumUser = async () => {
    if (!state.user || !state.token) return;
    startLoading()

    try {
      const resp : UserResponse= await removePremiumUserApi(state.user?.id, state.token)
      if(resp.message){
        return resp.message
      } else {
        dispatch({type: 'updateUser', payload: {user: resp.user}})
        showNotification('Dejaste de ser premium')
      }
    }
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }


  const checkPremium = async () => {
    if(!state.token) return ;
    try {
      const resp: UserResponse = await checkPremiumApi(state.token)
      if(resp.message){
        return resp.message
      } else {
        dispatch({type: 'updateUser', payload: {user: resp.user}})
      }
      
    } catch (error) {
      handleConnectionFail()
    }
  }

  const startLoading = ()=>{
    dispatch({type:'startLoading'})
  }

  const finishLoading = ()=>{
    dispatch({type:'finishLoading'})
  }


  return (
    <AuthContext.Provider
      value={{
        ...state,
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