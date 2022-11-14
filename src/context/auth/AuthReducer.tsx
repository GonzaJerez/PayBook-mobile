import {User, UserResponse} from '../../interfaces/User';

export interface AuthState {
  status: 'authenticated' | 'checking' | 'not-authenticated',
  user: User | null,
  token: string | null;
  isConnectionFailed: boolean;
  isLoading: boolean;
}

type AuthActions =
  | {type: 'login', payload: UserResponse}
  | {type: 'logout'}
  | {type: 'updateUser', payload: {user: User}}
  | {type: 'startLoading'}
  | {type: 'finishLoading'}


export const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {

  switch (action.type) {

    case 'login':
      return {
        ...state,
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token,
      }

    case 'logout':
      return {
        ...state,
        status: 'not-authenticated',
        user: null,
        token: null,
      }

    case 'updateUser': {
      return {
        ...state,
        user: action.payload.user,
      }
    }

    case 'startLoading':
      return {
        ...state,
        isLoading: true
      }

    case 'finishLoading':
      return {
        ...state,
        isLoading: false
      }

    default:
      return state;
  }
} 