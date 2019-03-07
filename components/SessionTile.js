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
    display = true,
    renderTimeInsteadOfSpeaker,
    addedToSchedule,
}) {

    const isKeynote = sessiontype.match(/keynote/i);

    if (!display) return null;

    else return (
        <TouchableOpacity
            style={[
                styles.sessionTile,
                isKeynote && styles.keynoteSession,
                addedToSchedule && styles.selectedSession,
                styles.marginBottomLarge,
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
                <Text style={[
                    styles.h3,
                    styles.marginBottomXxSmall,
                ]} >{title}</Text>
                {renderTimeInsteadOfSpeaker ? (
                    <Text style={[
                        styles.h4,
                        styles.marginBottomXxSmall,
                    ]} >{(
                        isKeynote ?
                            sessiontype.replace(/\D/g, '') < 2.5 ?
                                'Friday'
                                :
                                'Saturday'
                            :
                            sessiontype.replace(/\D/g, '') < 3.5 ?
                                'Friday'
                                :
                                'Saturday'
                    )} {sessiontime}</Text>
                ) : (
                        <Text style={[
                            styles.h4,
                            styles.marginBottomXxSmall,
                        ]} >{speakername}</Text>
                    )}
                <Text style={[
                    styles.text,
                ]} >Room: {room}</Text>
                <Text style={[
                    styles.text,
                ]} >Demographic{demographic.trim().match(/ .* /) ? 's' : ''}: {demographic}</Text>
            </View>
        </TouchableOpacity>
    );
}
