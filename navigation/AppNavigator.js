import {
    createStackNavigator,
} from 'react-navigation';

import Home from '../screens/Home';
import AllSessions from '../screens/AllSessions';
import Schedule from '../screens/Schedule';
import Map from '../screens/Map';
import Notifications from '../screens/Notifications';

import SelectBreakout from '../screens/SelectBreakout';
import SessionInfo from '../screens/SessionInfo';
import SpeakerInfo from '../screens/SpeakerInfo';
import Feedback from '../screens/Feedback';

const config = {
    defaultNavigationOptions: ({ navigation }) => ({
        
    }),
};

export default createStackNavigator({
    Home,
    AllSessions: createStackNavigator({
        AllSessions,
        SessionInfo,
        SpeakerInfo,
        Map,
        Feedback,
    }, config),
    Schedule: createStackNavigator({
        Schedule,
        SelectBreakout,
        SessionInfo,
        SpeakerInfo,
        Map,
        Feedback,
    }, config),
    Feedback,
    Map,
    Notifications,
}, {
        headerMode: 'none',
    });
