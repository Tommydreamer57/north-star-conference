import React from 'react';

import {
    ScrollView,
    View,
    TouchableOpacity,
    Button,
    Text,
    // Alert,
} from 'react-native';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageConsumer } from '../storage/StorageProvider';

SessionInfo.navigationOptions = createNavigationOptions("Session Info");

export default function SessionInfo({
    navigation: {
        state: {
            params: {
                sessionName,
                id,
            },
        },
        goBack,
        navigate,
    },
}) {
    return (
        <StorageConsumer>
            {({
                allSessions: {
                    [id]: {
                        sessiontime,
                        title,
                        description,
                        demographic,
                        speakername,
                        speakerbio,
                        speakerphoto,
                    } = {},
                },
                scheduleArray,
                addToSchedule,
                removeFromSchedule,
            }) => (
                    <ScrollView style={styles.view} >
                        <Text style={styles.h2} >
                            {sessionName}: {sessiontime}
                        </Text>
                        <Text style={styles.h2} >
                            {title}
                        </Text>
                        <Text style={styles.paragraph} >
                            {description}
                        </Text>
                        <Text style={styles.h4} >
                            {demographic}
                        </Text>
                        <Button
                            style={styles.button}
                            title={speakername}
                            onPress={() => navigate('SpeakerInfo', {
                                speakername,
                                speakerbio,
                                speakerphoto,
                            })}
                        />
                        {sessionName.match(/breakout/i) ? (
                            scheduleArray.some(({ selectedSession: { id: selectedId } }) => selectedId === id) ? (
                                <>
                                    <Button
                                        style={styles.button}
                                        title="Remove From Schedule"
                                        onPress={async () => {
                                            await removeFromSchedule(id);
                                            // Alert.alert(`Removed ${title} from schedule.`);
                                            goBack();
                                        }}
                                    />
                                    <Button
                                        style={styles.button}
                                        title="Provide Feedback"
                                        onPress={() => navigate("Feedback", { id, sessionName })}
                                    />
                                </>
                            ) : (
                                    <Button
                                        style={styles.button}
                                        title="Add To Schedule"
                                        onPress={async () => {
                                            await addToSchedule(id);
                                            // Alert.alert(`Added ${title} to schedule.`);
                                            goBack();
                                        }}
                                    />
                                )
                        ) : null}
                    </ScrollView>
                )}
        </StorageConsumer>
    );
}