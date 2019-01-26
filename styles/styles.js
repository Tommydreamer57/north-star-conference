import {
    StyleSheet,
} from 'react-native';

export const createNavigationOptions = title => ({
    title,
    headerStyle: {
        backgroundColor: Colors.blue,
    },
    headerTintColor: 'white',
});

export const Colors = {
    green: "#C8C751",
    blueGreen: "#60A471",
    blue: "#00849B",
    yellow: "#44CC22",
};

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
