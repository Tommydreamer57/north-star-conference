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
        sessiontime,
    },
    addedToSchedule,

}) {

    const isKeynote = sessiontype.match(/keynote/i);

    return (
        <TouchableOpacity
            style={isKeynote ?
                styles.keynoteSession
                :
                addedToSchedule ?
                    styles.selectedSession
                    :
                    styles.session}
            onPress={() => navigate("SessionInfo", { sessionName: sessiontype.toUpperCase(), id })}
        >
            <Text>{title}</Text>
            {isKeynote ? (
                <Text>{sessiontime}</Text>
            ) : null}
            <Text>{speakername}</Text>
        </TouchableOpacity>
    );
}
