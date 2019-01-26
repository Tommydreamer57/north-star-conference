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

export default createStackNavigator({
    Home,
    Keynotes: createStackNavigator({
        Keynotes,
        SessionInfo,
        SpeakerInfo,
        Map,
    }),
    Breakouts: createStackNavigator({
        Breakouts,
        SessionInfo,
        SpeakerInfo,
        Map,
    }),
    Schedule: createStackNavigator({
        Schedule,
        SelectBreakout,
        SessionInfo,
        SpeakerInfo,
        Map,
    }),
    Map,
    Mentors,
    Notifications,
}, {
        headerMode: 'none',
    });
