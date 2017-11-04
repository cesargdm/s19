import { StackNavigator } from 'react-navigation'

import GroupsScreen from '../screens/GroupsScreen'
import GroupsDetailScreen from '../screens/GroupsDetailScreen'

export default StackNavigator(
  {
    Group: {
      screen: GroupsScreen,
      path: '/group'
    },
    GroupDetail: {
      screen: GroupsDetailScreen,
      path: '/group/:groupId'
    }
  }
)
