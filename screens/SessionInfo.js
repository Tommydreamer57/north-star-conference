import React from 'react';

import {
    ScrollView,
    View,
    TouchableOpacity,
    Button,
    Text,
    // Alert,
} from 'react-native';

import { createNavigationOptions } from '../styles/styles';
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
                        sessiontype,
                        sessiontime,
                        title,
                        description,
                        demographic,
                        speakername,
                        speakerbio,
                        speakerphoto,
                    } = {},
                },
                schedule: {
                    [sessionName]: {
                        id: selectedSessionId,
                    }
                },
                addToSchedule,
                removeFromSchedule,
            }) => (
                    <ScrollView>
                        <Text>
                            {sessionName}: {sessiontime}
                        </Text>
                        <Text>
                            {title}
                        </Text>
                        <Text>
                            {description}
                        </Text>
                        <Text>
                            {demographic}
                        </Text>
                        <Button
                            title={speakername}
                            onPress={() => navigate('SpeakerInfo', {
                                speakername,
                                speakerbio,
                                speakerphoto,
                            })}
                        />
                        {sessionName.match(/breakout/i) ? (
                            id === selectedSessionId ? (
                                <Button
                                    title="Remove From Schedule"
                                    onPress={async () => {
                                        await removeFromSchedule(id);
                                        // Alert.alert(`Removed ${title} from schedule.`);
                                        goBack();
                                    }}
                                />
                            ) : (
                                    <Button
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