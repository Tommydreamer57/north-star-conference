import React from 'react';

import {
    ScrollView,
    Text,
    Platform,
} from 'react-native';

import {
    createStackNavigator,
    createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import Home from '../screens/Home';
import Keynotes from '../screens/Keynotes';
import Breakouts from '../screens/Breakouts';
import Schedule from '../screens/Schedule';
import Mentors from '../screens/Mentors';
import Map from '../screens/Map';
import Notifications from '../screens/Notifications';

export default createStackNavigator({
    Home,
    Keynotes,
    Breakouts,
    Schedule,
    Map,
    Mentors,
    // Audio,
    Notifications,
    // Contact,
    // Donate,
}, {
        headerMode: 'none',
    });

// HomeStack.navigationOptions = {
//     tabBarLabel: "Home",
//     TabBarIcon: ({ focused }) => (
//         <TabBarIcon
//             focused={focused}
//             name={Platform.OS === 'ios' ?
//                 `ios-information-circle${
//                 focused ?
//                     ''
//                     :
//                     '-outline'
//                 }`
//                 :
//                 'md-information-circle'
//             }
//         />
//     )
// }

// export default createBottomTabNavigator({
//     HomeStack,
// });
