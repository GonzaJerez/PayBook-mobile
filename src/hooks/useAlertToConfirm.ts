import {Alert} from "react-native";

interface Props {
  title:    string;
  message:  string;
  textToConfirm?: string;
  onCancel: ()=> void;
  onConfirm: ()=>void;
}


export const useAlertToConfirm = ({title, message, textToConfirm='Aceptar', onCancel, onConfirm}:Props) =>{

  const showAlert = async()=>{
    return new Promise((res,rej) =>{
      Alert.alert(
        title,
        message,
        [
          {
            text: 'Cancelar',
            onPress: onCancel,
            style: "cancel"
          },
          {
            text: textToConfirm,
            onPress: onConfirm,
            style:'default'
          }
        ],
        {
          cancelable: true
        }
      )
    })
  }

  return {
    showAlert
  }
}