import {User, UserResponse} from '../../interfaces/User';

export interface AuthState {
  status: 'authenticated' | 'checking' | 'not-authenticated',
  user: User | null,
  token: string | null;
  isConnectionFailed: boolean;
  error: string | null;
}

type AuthActions =
  | {type: 'login', payload: UserResponse}
  | {type: 'logout'}
  | {type: 'updateUser', payload: {user: User}}
  // | {type: 'deleteUser'}
  | {type: 'premiumUser', payload: {user:User}}
  | {type: 'setError', payload: string}
  | {type: 'cleanErrors'}


export const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {

  switch (action.type) {

    case 'login':
      return {
        ...state,
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token,
        error:''
      }

    case 'logout':
      return {
        ...state,
        status: 'not-authenticated',
        user: null,
        token: null,
        error: ''
      }

    case 'updateUser': {
      return {
        ...state,
        user: action.payload.user,
      }
    }

    // case 'premiumUser': {
    //   return {
    //     ...state,
    //     user: {...action.payload.user, isPremium: true},
    //   }
    // }

    case 'setError':
      return {
        ...state,
        error: action.payload
      }

    case 'cleanErrors':
      return {
        ...state,
        error: null
      }

    default:
      return state;
  }
} 