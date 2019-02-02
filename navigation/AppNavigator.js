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

export default createStackNavigator({
    Home,
    AllSessions,
    Schedule,
    SelectBreakout,
    SessionInfo,
    SpeakerInfo,
    Feedback,
    Map,
    Notifications,
});
