import React from 'react';
import { Alert } from '../components/Alert';
import { AlertProps, AlertTypes } from '../interfaces';

interface AlertContextProps {
  showAlert: (text: string, type?: AlertTypes) => void
}

const AlertContext = React.createContext<Partial<AlertContextProps>>({});

type AlertState = AlertProps & {
  show: boolean
}

export const AlertContextProvider: React.FC = ({children}) => {
  const [alertState, setAlertState] = React.useState<AlertState>({
    text: '',
    type: 'danger',
    show: false
  });

  const showAlert = (text: string, type: AlertTypes = 'danger'): void => setAlertState({text, type, show: true});
  const hideAlert = (): void => setAlertState({type: 'danger', text: '', show: false});

  const value: AlertContextProps = { showAlert };

  return (
    <AlertContext.Provider value={value}>
      {alertState.show && <Alert text={alertState.text} type={alertState.type} hide={hideAlert}/>}
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => React.useContext(AlertContext);