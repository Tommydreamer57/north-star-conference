import {
    createStackNavigator,
} from 'react-navigation';

import Home from '../screens/Home';
import Keynotes from '../screens/Keynotes';
import Breakouts from '../screens/Breakouts';
import Schedule from '../screens/Schedule';
import Mentors from '../screens/Mentors';
import Map from '../screens/Map';
import Notifications from '../screens/Notifications';

import SelectBreakout from '../screens/SelectBreakout';
import SessionInfo from '../screens/SessionInfo';
import SpeakerInfo from '../screens/SpeakerInfo';

const config = {
    defaultNavigationOptions: ({ navigation }) => ({
        
    }),
};

export default createStackNavigator({
    Home,
    Keynotes: createStackNavigator({
        Keynotes,
        SessionInfo,
        SpeakerInfo,
        Map,
    }, config),
    Breakouts: createStackNavigator({
        Breakouts,
        SessionInfo,
        SpeakerInfo,
        Map,
    }, config),
    Schedule: createStackNavigator({
        Schedule,
        SelectBreakout,
        SessionInfo,
        SpeakerInfo,
        Map,
    }, config),
    Map,
    Mentors,
    Notifications,
}, {
        headerMode: 'none',
    });
