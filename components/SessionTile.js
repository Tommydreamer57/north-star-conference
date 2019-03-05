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
    onPress,
    session: {
        id,
        title = "",
        speakername = "",
        sessiontype = "",
        sessiontime = "",
        room = "",
        demographic = "",
    } = {},
    renderTimeInsteadOfSpeaker,
    addedToSchedule,
}) {

    const isKeynote = sessiontype.match(/keynote/i);

    return (
        <TouchableOpacity
            style={[
                styles.sessionTile,
                isKeynote && styles.keynoteSession,
                addedToSchedule && styles.selectedSession,
            ]}
            onPress={onPress || (() => navigate("SessionInfo", {
                sessionName: sessiontype.toUpperCase(),
                id,
            }))}
        >
            <View style={[
                styles.sessionTileBar,
                isKeynote ?
                    styles.blueBackground
                    :
                    styles.blackBackground,
            ]} />
            <View>
                {isKeynote ? (
                    <>
                        <Text style={styles.h2} >{title}</Text>
                        {renderTimeInsteadOfSpeaker && (
                            <Text style={styles.h3} >{speakername}</Text>
                        )}
                        <Text style={styles.h4} >{sessiontime.replace(/.*DAY /i, '')}</Text>
                    </>
                ) : (
                        <>
                            <Text style={styles.h3} >{title}</Text>
                            {renderTimeInsteadOfSpeaker ? (
                                <Text style={styles.h4} >{(
                                    sessiontype.match(/breakout/i) ?
                                        sessiontype.replace(/\D/g, '') < 3.5 ?
                                            'Friday'
                                            :
                                            'Saturday'
                                        :
                                        sessiontype.replace(/\D/g, '') < 2.5 ?
                                            'Friday'
                                            :
                                            'Saturday'
                                )} {sessiontime}</Text>
                            ) : (
                                    <Text style={styles.h4} >{speakername}</Text>
                                )}
                        </>
                    )}
                {/* <Text style={styles.h2} >{title}</Text>
            <Text style={styles.h3} >{speakername}</Text>
            {isKeynote ? (
                <Text style={styles.h4} >{sessiontime.replace(/.*DAY /i, '')}</Text>
            ) : null} */}
                <Text style={styles.text} >Room: {room}</Text>
                <Text style={styles.text} >Demographic{demographic.trim().match(/ .* /) ? 's' : ''}: {demographic}</Text>
            </View>
        </TouchableOpacity>
    );
}
