import React from 'react';

import {
    ScrollView,
    View,
    Image,
    Button,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';

import { StorageConsumer } from '../storage/StorageProvider';

SessionInfo.navigationOptions = createNavigationOptions("Session Info");

export default function SessionInfo({
    navigation: {
        state: {
            params: {
                sessionName = '',
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
                        sessiontime = '',
                        title = '',
                        description = '',
                        demographic = '',
                        speakername = '',
                        speakerbio = '',
                        speakerphoto = '',
                    } = {},
                },
                scheduleArray,
                addToSchedule,
                removeFromSchedule,
            }) => (
                    <ScrollView>
                        <View style={styles.view} >
                            <Text style={styles.h1} >{title}</Text>
                            <TouchableOpacity
                                onPress={() => navigate('SpeakerInfo', {
                                    speakername,
                                    speakerbio,
                                    speakerphoto,
                                })}
                            >
                                <Image
                                    style={styles.speakerphoto}
                                    source={{
                                        uri: speakerphoto
                                            ||
                                            'https://www.nycc.edu/themes/nycc/images/default_profile.jpg',
                                    }}
                                />
                                <Text style={styles.h2}>{speakername}</Text>
                            </TouchableOpacity>
                            <Text style={styles.h4} >{sessionName}: {sessiontime}</Text>
                            <Text style={styles.h4} >{demographic}</Text>
                            <Text style={styles.text} >{description}</Text>
                            {sessionName.match(/breakout/i) ? (
                                scheduleArray.some(({
                                    selectedSession: {
                                        id: selectedId,
                                    } = {},
                                }) => selectedId === id) ? (
                                        <Button
                                            style={styles.button}
                                            title="Remove From Schedule"
                                            onPress={async () => {
                                                await removeFromSchedule(id);
                                                goBack();
                                            }}
                                        />
                                    ) : (
                                        <Button
                                            style={styles.button}
                                            title="Add To Schedule"
                                            onPress={async () => {
                                                await addToSchedule(id);
                                                goBack();
                                            }}
                                        />
                                    )
                            ) : null}
                            <Button
                                style={styles.button}
                                title="Provide Feedback"
                                onPress={() => navigate("Feedback", { id, sessionName })}
                            />
                        </View>
                    </ScrollView>
                )}
        </StorageConsumer>
    );
}