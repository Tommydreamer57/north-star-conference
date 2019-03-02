import React from 'react';

import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';

import { StorageConsumer } from '../storage/StorageProvider';

import styles from '../styles/styles';

import createNavigationOptions from '../navigation/navigation-options';

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
                    } = {},
                },
            }) => (
                    <ScrollView>
                        <View style={styles.view}>
                            <Text style={styles.h3} >
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
                        </View>
                    </ScrollView>
                )}
        </StorageConsumer>
    );
}
