import {
    StyleSheet,
} from 'react-native';

import Colors from './Colors';

export default StyleSheet.create({
    header: {
        backgroundColor: Colors.blue,
    },
    view: {

    },
    breakoutTitle: {
        
    },
    sessionTitle: {
        fontWeight: 'bold',
    },
    breakoutGroup: {
        margin: 5,
        backgroundColor: Colors.blue,
    },
    session: {
        margin: 5,
        backgroundColor: Colors.blueGreen,
    },
    keynoteSession: {
        margin: 5,
        backgroundColor: 'blue',
    },
    emptySession: {
        margin: 5,
        backgroundColor: Colors.green,
    },
    selectedSession: {
        margin: 5,
        backgroundColor: Colors.yellow,
    }
});
