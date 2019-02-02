import React from 'react';

import {
    View,
    Text,
    Button,
    TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';

export default function SessionTile({
    navigation: {
        navigate,
    },
    session: {
        id,
        title,
        speakername,
        sessiontype,
    },
    addedToSchedule,

}) {

    return (
        <TouchableOpacity
            style={sessiontype.match(/keynote/i) ?
                styles.keynoteSession
                :
                addedToSchedule ?
                    styles.selectedSession
                    :
                    styles.session}
            onPress={() => navigate("SessionInfo", { sessionName: sessiontype.toUpperCase(), id })}
        >
            <Text>
                {title}
            </Text>
            <Text>
                {speakername}
            </Text>
        </TouchableOpacity>
    );
}
