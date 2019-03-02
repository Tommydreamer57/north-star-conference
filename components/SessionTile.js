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
        room,
        demographic,
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
            onPress={() => navigate("SessionInfo", {
                sessionName: sessiontype.toUpperCase(),
                id,
            })}
        >
            {isKeynote ? (
                <>
                    <Text style={styles.h2} >{title}</Text>
                    <Text style={styles.h3} >{speakername}</Text>
                    <Text style={styles.h4} >{sessiontime.replace(/.*DAY /i, '')}</Text>
                </>
            ) : (
                    <>
                        <Text style={styles.h3} >{title}</Text>
                        <Text style={styles.text} >{speakername}</Text>
                    </>
                )}
            <Text style={styles.text} >{room}</Text>
            <Text style={styles.text} >{demographic}</Text>
        </TouchableOpacity>
    );
}
