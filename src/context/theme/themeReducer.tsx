import {Theme} from '@react-navigation/native'


type ThemeAction =
  | {type: 'set_light_theme'}
  | {type: 'set_dark_theme'}

export interface ThemeState extends Theme {
  backgroundModal: string;
  currentTheme: 'light' | 'dark';
  delete: string;
  disable: string;
  ligthText: string;
  separator: string;
  menu: string;
  shadow: string;
}

export const lightTheme: ThemeState = {
  currentTheme: 'light',
  dark: false,
  separator: '#eee',
  ligthText: '#777',
  disable:'#ccc',
  delete: '#F02000',
  backgroundModal:'#dddddd99',
  menu: '#E6E6E6',
  shadow: '#aaa',
  colors: {
    primary: '#92D2B9',
    background: '#fafafa',
    card: '#fff',
    text: '#333',
    border: '#ddd',
    notification: 'teal',
  }
}

export const darkTheme: ThemeState = {
  currentTheme: 'dark',
  dark: true,
  separator: '#555',
  ligthText: '#bbb',
  disable:'#555',
  delete: '#F0200080',
  backgroundModal:'#22222299',
  menu: '#ccc',
  shadow: '#1a1a1a',
  colors: {
    primary: '#92D2B9',
    background: '#222',
    card: '#2a2a2a',
    text: '#ddd',
    border: '#333',
    notification: 'teal',
  }
}

export const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'set_light_theme':
      return {...lightTheme}

    case 'set_dark_theme':
      return {...darkTheme}

    default:
      return state
  }
}