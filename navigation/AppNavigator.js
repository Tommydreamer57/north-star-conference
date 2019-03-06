import {
    createStackNavigator,
} from 'react-navigation';

import Home from '../screens/Home';
import AllSessions from '../screens/AllSessions';
import AllSpeakers from '../screens/AllSpeakers';
import Schedule from '../screens/Schedule';
import Map from '../screens/Map';
import Notifications from '../screens/Notifications';

import SelectBreakout from '../screens/SelectBreakout';
import SessionInfo from '../screens/SessionInfo';
import SpeakerInfo from '../screens/SpeakerInfo';
import Feedback from '../screens/Feedback';

import { COLORS } from '../styles/styles';

export default createStackNavigator({
    Home,
    AllSessions,
    AllSpeakers,
    Schedule,
    SelectBreakout,
    SessionInfo,
    SpeakerInfo,
    Feedback,
    Map,
    Notifications,
}, {
        cardStyle: {
            backgroundColor: COLORS.white,
        },
    }
);
