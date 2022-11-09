import {createContext, useState} from 'react';

interface RequestStatusContextProps extends StatusProps{
  showStatus: (messages: MessagesStatus) => void;
  setSuccessStatus: () => void;
  hideStatus: () => void;
  startLoading: () => void;
  finishLoading: () => void;
  handleConnectionFail: () => void;
  setFailureStatus: () => void;
  clearConnectionFailure: () => void;
}


interface StatusProps extends MessagesStatus{
  statusVisible:      boolean;
  success:            boolean;
  isLoading:          boolean;
  isConnectionFailed: boolean;
}

export interface MessagesStatus {
  successMessage: string;
  failureMessage: string;
  loadingMessage: string;
}

export const RequestsStatusContext = createContext({} as RequestStatusContextProps)

export const RequestsStatusProvider = ({children}:{children:JSX.Element | JSX.Element[]})=>{

  const [status, setStatus] = useState<StatusProps>({
    statusVisible: false,
    success: false,
    failureMessage: '',
    loadingMessage: '',
    successMessage: '',
    isConnectionFailed: false,
    isLoading: false
  })
  

  const showStatus = (messages:MessagesStatus)=>{
    setStatus({
      ...status,
      ...messages,
      statusVisible: true,
      isLoading: true
    })
  }

  const hideStatus = ()=>{
    setStatus({
      ...status,
      statusVisible: false,
    })
  }


  const setSuccessStatus = ()=>{
    setStatus((prev)=>({
      ...prev,
      success: true,
      isLoading: false
    }))
  }

  const setFailureStatus = ()=>{
    setStatus((prev)=>({
      ...prev,
      success: false,
      isLoading: false
    }))
  }

  const startLoading = () => {
    setStatus((prev)=>({
      ...prev,
      isLoading: true
    }))
  }

  const finishLoading = () => {
    setStatus((prev)=>({
      ...prev,
      isLoading: false
    }))
  }

  const handleConnectionFail = () => {
    setStatus((prev)=>({
      ...prev,
      isConnectionFailed: true,
      isLoading: false,
      success: false
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
        showStatus,
        hideStatus,
        setSuccessStatus,
        startLoading,
        finishLoading,
        handleConnectionFail,
        setFailureStatus,
        clearConnectionFailure
      }}
    >
      {children}
    </RequestsStatusContext.Provider>
  )
}