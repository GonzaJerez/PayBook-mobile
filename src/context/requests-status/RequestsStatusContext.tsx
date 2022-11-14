import {createContext, useState} from 'react';

interface RequestStatusContextProps extends StatusProps{
  showNotification: (successMessage: string) => void;
  hideNotification: () => void;
  handleConnectionFail: () => void;
  clearConnectionFailure: () => void;
}


interface StatusProps {
  successMessage: string;
  showingNotification: boolean;
  isConnectionFailed: boolean;
}

export const RequestsStatusContext = createContext({} as RequestStatusContextProps)

export const RequestsStatusProvider = ({children}:{children:JSX.Element | JSX.Element[]})=>{

  const [status, setStatus] = useState<StatusProps>({
    successMessage: '',
    isConnectionFailed: false,
    showingNotification: false
  })
  

  const showNotification = (successMessage: string)=>{
    setStatus({
      ...status,
      successMessage,
      showingNotification: true
    })
  }

  const hideNotification = ()=>{
    setStatus({
      ...status,
      showingNotification: false,
    })
  }

  const handleConnectionFail = () => {
    setStatus((prev)=>({
      ...prev,
      isConnectionFailed: true,
    }))
  }

  const clearConnectionFailure = ()=>{
    setStatus(prev => ({
      ...prev,
      isConnectionFailed: false,
    }))
  }


  return (
    <RequestsStatusContext.Provider
      value={{
        ...status,
        showNotification,
        hideNotification,
        handleConnectionFail,
        clearConnectionFailure
      }}
    >
      {children}
    </RequestsStatusContext.Provider>
  )
}