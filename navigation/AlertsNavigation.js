import { StackNavigator } from 'react-navigation'

import AlertsScreen from '../screens/AlertsScreen'
import NewAlertScreen from '../screens/NewAlertScreen'

const ModalStack = StackNavigator(
  {
    Root: {
      screen: AlertsScreen,
    },
    NewAlert: {
      path: 'alerts/new',
      screen: NewAlertScreen,
      header: null
    },
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
)

export default ModalStack
