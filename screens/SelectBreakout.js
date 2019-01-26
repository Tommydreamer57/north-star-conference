import React from 'react';

import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';

import { StorageConsumer } from '../storage/StorageProvider';

import styles, { createNavigationOptions } from '../styles/styles';

SelectBreakout.navigationOptions = ({ navigation: { state: { params: { sessionName } } } }) => ({
    ...createNavigationOptions("Select Breakout"),
    title: sessionName,
});

export default function SelectBreakout({
    navigation: {
        navigate,
        state: {
            params: {
                sessionName,
                id,
            }
        }
    }
}) {
    return (
        <StorageConsumer>
            {({
                breakouts: {
                    [sessionName]: breakouts = [],
                },
                schedule: {
                    [sessionName]: {
                        id: selectedSessionId
                    },
                },
            }) => (
                    <ScrollView>
                        <Text>
                            {sessionName}
                        </Text>
                        {breakouts.map(({
                            id,
                            title,
                            speakername,
                        }) => (
                                <TouchableOpacity
                                    key={id}
                                    onPress={() => navigate("SessionInfo", { sessionName, id })}
                                    style={id === selectedSessionId ?
                                        styles.selectedSession
                                        :
                                        styles.session}
                                >
                                    <Text>
                                        {title}
                                    </Text>
                                    <Text>
                                        {speakername}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                    </ScrollView>
                )}
        </StorageConsumer>
    );
}
